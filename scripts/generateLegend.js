const fs = require("fs");
const { exec } = require("child_process");
const json2csv = require('json2csv').parse;
const path = require('path');
const chokidar = require('chokidar');
const axios = require("axios");
const FormData = require("form-data");
const mv = require('mv');
// const { ethers } = require("hardhat");
const express = require('express')

// ENV variables

require('dotenv').config();
const pinataApiKey = process.env.PINATAAPIKEY;
const pinataSecretApiKey = process.env.PINATASECRETKEY;
const PORT = process.env.PORT || 3001;

// Endpoints

const MINT_ENDPOINT = '/api/mint'

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

// Generator Paths

const generator_datatable = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Files/dataPhoenix.csv') // put in env
const generator_png_dir = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Images/')


function appendCSV(metadata, dt) {
    return new Promise(resolve => {

        const newLine = '\r\n';
        const new_metadata = metadata

        fs.stat(dt, function (err, stat) {
            if (err == null) {

                const csv = json2csv(new_metadata, { header: false, quote: '' }) + newLine;

                fs.appendFile(dt, csv, function (err) {
                    if (err) throw err;
                    resolve('NFT DNA Appended!')
                });
            } else {
                console.log('\nError: Datatable not detected');
            }
        });
    })
}

QmNzLWQfqshqp48dSj6FspcpiQ5GNnDd6UoG5jN1kCJG87

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

function watchPNG(dir, file) { // merge with above or below function
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

function pinPNG(dir, file) {
    return new Promise(resolve => {

        const pinFileToIPFS = async () => {
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

            let data = new FormData();
            let image = path.join(dir, file)

            data.append("file", fs.createReadStream(image));

            const res = await axios.post(url, data, {
                maxContentLength: "Infinity",
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,


                },
            });

            let img_hash = JSON.parse(JSON.stringify(res.data.IpfsHash));

            const current_path = image
            const destination_path = path.join(__dirname, './minted', file);

            mv(current_path, destination_path, function (err) {
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

async function generateNewLegend(dna) {

    const id = dna.tokenDNA.split(',', 1)
    const generated_png = id + ".png"

    await appendCSV(dna, generator_datatable)
    await generatePNG(id)
    await watchPNG(generator_png_dir, generated_png)
    const child_hash = await pinPNG(generator_png_dir, generated_png)
    return child_hash
}

app.post(MINT_ENDPOINT, async (req, res) => {
    const child_hash = await generateNewLegend(req.body)
    return res.status(200).send(`ipfs://${child_hash}`)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))