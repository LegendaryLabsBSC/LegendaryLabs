const fs = require("fs");
const { exec } = require("child_process");
const json2csv = require('json2csv').parse;
const path = require('path');
const chokidar = require('chokidar');
const axios = require("axios");
const FormData = require("form-data");
const mv = require('mv');
const { ethers } = require("hardhat");
const { resolve } = require("url");
// const prompt = require('prompt-sync')()
const express = require('express')
const bodyParser = require('body-parser')
const { idText } = require('typescript')
const fetch = require('node-fetch')
const IPFSGatewayTools = require('@pinata/ipfs-gateway-tools/dist/node');
const { BigNumber } = require("ethers");
const { connected } = require("process");


// env variables

require('dotenv').config();
const pinataApiKey = process.env.PINATAAPIKEY;
const pinataSecretApiKey = process.env.PINATASECRETKEY;
const gatewayTools = new IPFSGatewayTools();
const PORT = process.env.PORT || 3001;

// Endpoints

const RANDOM_ENDPOINT = '/api/random'

// App variables

const app = express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin', 'http://myapp.com');
    res.set('Access-Control-Allow-Methods', 'GET,POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

// File/Directory paths

const new_metadata_location = path.join(__dirname, '../test_data/mint_test_metadata.json')
const meta_with_png_location = path.join(__dirname, '../test_data/updated_metadata.json')
const generator_datatable = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Files/dataPhoenix.csv')
const generator_png_dir = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Images/')

// Helper Functions

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}


function writetoCSV(metadata, dt) {
    return new Promise(resolve => {
        setTimeout(() => {

            var newLine = '\r\n';
            var new_metadata = metadata


            fs.stat(dt, function (err, stat) {
                if (err == null) {
                    console.log('\nDatatable discovered');

                    var csv = json2csv(new_metadata, { header: false, quote: '' }) + newLine;

                    fs.appendFile(dt, csv, function (err) {
                        if (err) throw err;
                        console.log('\nNew NFT metadata added to datatable');
                        resolve('\nStep-2 Complete')
                    });
                } else {
                    console.log('\nError: Datatable not detected');
                }
            });
        }, 500)
    })
}

function callGenerator(id) {
    return new Promise(resolve => {
        setTimeout(() => {

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
                resolve('Step-G Complete')
            });
        }, 500)
    })
}

// watch for id.png to be output before continuing
//      3-watcher.js

function watchPNG(dir, file) {
    return new Promise(resolve => {
        setTimeout(() => {

            let output_png = path.join(dir, file);
            let watcher = chokidar.watch(output_png, { ignored: /^\./, persistent: true });

            watcher
                .on('ready', () => { console.log('\nWatching for', output_png, 'output'); })
                .on('add', function (output_png) {
                    console.log('\nFile', output_png, 'has been generated');
                    watcher.close()
                    resolve('\nStep-3 Complete\n')
                })
                .on('error', function (error) { console.error('Error happened', error); })
        }, 500)
    })
}

// ipfs/pinata send off id.png
//     4-uploadFile.js

function pinPNG(dir, file) {
    return new Promise(resolve => {
        setTimeout(() => {

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

                console.log('png pinned to IPFS: ', img_hash)

                const currentPath = image
                const destinationPath = path.join(__dirname, './minted', file);

                mv(currentPath, destinationPath, function (err) {
                    if (err) {
                        throw err
                    } else {
                        console.log("\nRemoved png from staging area");
                    }
                    console.log('\nStep-4 Complete')
                    resolve(img_hash)
                });
            };
            pinFileToIPFS(dir, file);
        }, 500)
    })
}

// load nft-img ipfs hash into metadata 
//     5-update_data.js 

// mock function for breeding demo

async function appendDNA(id, hash) {
    async function main() {
        const NFT = await ethers.getContractFactory("LegendsNFT");
        const URI = "ipfs://" + hash;
        const WALLET_ADDRESS = "0x55f76D8a23AE95944dA55Ea5dBAAa78Da4D29A52" // Using BSC testnet wallet
        const CONTRACT_ADDRESS = "0xD93AeCa38D4f02BeE5D8216B79868dFf12b68634"
        const contract = NFT.attach(CONTRACT_ADDRESS);
        const set_uri = await contract.setTokenURI(1, URI)
        console.log(set_uri)
        // const ipfsURL = await contract.tokenURI(1)
        // test out event listers
        //contract.on("createdDNA", (data, event) => {
        //   console.log('good1', data.toString());
        //   const idd = data.toString()
        //   nextOne(idd);
        // })
    }
    main().then(() => process.exit(0)).catch(error => {
        console.error(error);
        process.exit(1);
    });
}


async function randomMintGen(dna) {

    const id = dna.ipfss.split(',', 1)
    const generated_png = id + ".png"

    await writetoCSV(dna, generator_datatable)
    await callGenerator(id)
    await watchPNG(generator_png_dir, generated_png)
    const png_hash = await pinPNG(generator_png_dir, generated_png)
    console.log(png_hash)
    // await appendDNA(id, png_hash)
    return png_hash
}


app.post(RANDOM_ENDPOINT, async (req, res) => {
    console.log('good', req.body)
    const _newHash = await randomMintGen(req.body)
    console.log(_newHash)
    return res.send(`ipfs://${_newHash}`)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
