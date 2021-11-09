const fs = require("fs");
const { exec } = require("child_process");
// const json2csv = require('json2csv').parse;
const path = require('path');
const chokidar = require('chokidar');
const axios = require("axios");
const FormData = require("form-data");
const mv = require('mv');
// const { ethers } = require("hardhat");
const express = require('express');

// ENV variables
require('dotenv').config();
const pinataApiKey = process.env.PINATAAPIKEY;
const pinataSecretApiKey = process.env.PINATASECRETKEY;
const PORT = process.env.PORT || 3002;

// Generator Paths
const generator_datatable = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Files/dataPhoenix.csv') // put in env
const generator_png_dir = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Images/')
const tmp_uriLink = path.join(__dirname, '../test/tmp_uri-link.csv')

// Endpoints
const MINT_ENDPOINT = '/api/mint'
const RETRIEVE_ENDPOINT = '/api/retrieve'

// App variables
const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin', 'http://myapp.com');
    res.set('Access-Control-Allow-Methods', 'GET,POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.sendStatus(200);

    next();
});

function appendCSV(legend, dt) {
    return new Promise(resolve => {
        const newLine = '\r\n';
        const generatorData = (legend.id + ',' + legend.genetics + '\n')
        fs.stat(dt, function (err, stat) {
            if (err == null) {
                fs.appendFile(dt, generatorData, function (err) {
                    if (err) throw err;
                    resolve('NFT DNA Appended!')
                });
            } else {
                console.log('\nError: Datatable not detected');
            }
        });
    })
}

function generatePNG(id) {
    return new Promise(resolve => {
        const command = path.join(__dirname, `../phoenixGenerator_1.1/genPhoenix.exe id=${id}`)
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                // return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                // return;
            }
            // console.log(`${stdout}`);
            resolve('Generator Called!')
        });
    })
}

function watchPNG(dir, file) {
    return new Promise(resolve => {
        const output_png = path.join(dir, file);
        const watcher = chokidar.watch(output_png, { ignored: /^\./, persistent: true });
        watcher
            .on('ready', () => { console.log('\nWatching for', output_png, 'output'); })
            .on('add', function (output_png) {
                console.log('\nFile', output_png, 'has been generated');
                watcher.close()
                resolve('NFT PNG Generated!')
            })
            .on('error', function (error) { console.error('Error happened', error); })
    })
}

function pinPNG(dir, file, legend) {
    return new Promise(resolve => { // ?
        const pinFileToIPFS = async () => {
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
            const data = new FormData();
            const image = path.join(dir, file)

            data.append("file", fs.createReadStream(image));

            // TODO: look into querying wrapped hashes more
            const pinataOptions = JSON.stringify({
                cidVersion: 1,
                // wrapWithDirectory: true
            });
            data.append('pinataOptions', pinataOptions);

            const metadata = JSON.stringify({
                name: `${legend.id + legend.genetics + legend.parents + legend.birthDay}`
                    .replace(/,/g, '')
                ,
                keyvalues: { // TODO: move to pindata function
                    id: `${legend.id}`,
                    genetics: `${legend.genetics}`,
                    parents: `${legend.parents}`,
                    birthDay: `${legend.birthDay}`,
                    season: `${legend.season}`,
                    isLegendary: `${legend.isLegendary}`
                }
            });
            data.append('pinataMetadata', metadata);

            const res = await axios.post(url, data, {
                maxContentLength: "Infinity",
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });

            console.log(res.data)
            const img_hash = JSON.parse(JSON.stringify(res.data.IpfsHash));

            const currentPath = image
            const destination_path = path.join(__dirname, '../test/minted', file);
            mv(currentPath, destination_path, function (err) {
                if (err) {
                    throw err
                } else {
                    resolve(img_hash)
                }
            });
        };
        pinFileToIPFS(dir, file);
    })
}

/**
 * TODO: work in querying from Pinata API
 * will be used later with "hatching" 
 */
async function getIPFS(legend) {
    // return new Promise(resolve => {
    // const pinFileToIPFS = async () => {
    const url = `https://api.pinata.cloud/data/pinList?metadata[keyvalues][id]={"value":${legend},"op":"eq"}`;

    // return axios
    const res = await axios.get(url, {
        headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
        }
    })
    const hatchedURI = (res.data.rows[0].ipfs_pin_hash)
    return hatchedURI
    // .then(function (response) {
    //     const hatchedURI = (response.data.rows[0].ipfs_pin_hash)
    //     console.log(hatchedURI)
    //     // return hatchedURI
    // })
    // .catch(function (error) {
    //     console.log(error)
    // });

}

async function generateNewLegend(legend) {
    const generated_png = (legend.id + ".png")
    await appendCSV(legend, generator_datatable)
    await generatePNG(legend.id)
    await watchPNG(generator_png_dir, generated_png)
    const child_hash = await pinPNG(generator_png_dir, generated_png, legend)
    // await getIPFS(legend)
    return child_hash
}

app.post(MINT_ENDPOINT, async (req, res) => {
    const legend = req.body.legendInterface
    console.log(legend)
    const child_hash = await generateNewLegend(legend)
    return res.status(200).send(`ipfs://${child_hash}`)
})

app.post(RETRIEVE_ENDPOINT, async (req, res) => {
    const legend = req.body.id
    const hatchedURI = await getIPFS(legend)
    console.log(hatchedURI)
    return res.status(200).send(`ipfs://${hatchedURI}`)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))