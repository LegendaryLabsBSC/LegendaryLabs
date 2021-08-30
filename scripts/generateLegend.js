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


// env variables

require('dotenv').config();
const pinataApiKey = process.env.YOURAPIKEY;
const pinataSecretApiKey = process.env.YOURSECRETKEY;
const gatewayTools = new IPFSGatewayTools();
const PORT = process.env.PORT || 3001;

// Endpoints
const MINT_ENDPOINT = '/api/test'
const ID_ENDPOINT = '/api/id'
const BREED_ENDPOINT = '/api/breed'
const EASY_ENDPOINT = '/api/easy'
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

// make this into a more secure function
// have function read last id from smart contract, not from csv
function new_id() {
    return new Promise(resolve => {
        fs.readFile(generator_datatable, 'ascii', function (err, data) {
            if (err) throw err;

            let lines = data.trim().split('\n');
            let lastLine = lines.slice(-1)[0];

            let fields = lastLine.split(',');
            let counter = fields.slice(0)[0].replace('file:\\\\', '');
            let _id = ++counter

            resolve(_id)
        });
    })

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
                const destinationPath = path.join(__dirname, '../MINTED', file);

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

function appendDNA(old_file, new_file, hash) {
    return new Promise(resolve => {
        setTimeout(() => {
            jsonReader(old_file, (err, dna) => {
                if (err) {
                    console.log(err);
                    return;
                }

                dna.image = "ipfs://" + hash

                fs.writeFile(new_file, JSON.stringify(dna), err => {
                    if (err) {
                        console.log("Error writing file:", err);
                    }

                    console.log('\nNFT-DNA ready to upload:\n', dna);
                    resolve('\nStep-5 Complete')
                });
            });
        }, 500)
    })
}

// ipfs/pinata senf off entire NFT
//     6-uploadFile.js

function pinNFT(dir) {
    return new Promise(resolve => {
        setTimeout(() => {

            const pinFileToIPFS = async () => {
                const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

                let data = new FormData();
                let new_dna = dir

                data.append("file", fs.createReadStream(new_dna));

                const res = await axios.post(url, data, {
                    maxContentLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataSecretApiKey,
                    },
                });

                var dna_hash = JSON.parse(JSON.stringify(res.data.IpfsHash));

                console.log('\nNFT-DNA pinned to IPFS: ', dna_hash)
                console.log('\nStep-6 Complete')
                resolve(dna_hash)
            };
            pinFileToIPFS();
        }, 500)
    })
}

// Load DNA metadata into NFT solidity contract
//  7-load-nft.js / 8-toMint.sol

function mintNFT(hash) {
    return new Promise(resolve => {
        setTimeout(() => {

            async function main() {
                const NFT = await ethers.getContractFactory("LegendsNFT");
                const URI = "ipfs://" + hash;
                const WALLET_ADDRESS = "0x55f76D8a23AE95944dA55Ea5dBAAa78Da4D29A52" // Using BSC testnet wallet
                // const CONTRACT_ADDRESS = "0xE0E0bD78F6F509514F4A1E066E5C9B90950624Fb" // using a basic test NFT contract
                const CONTRACT_ADDRESS = "0xBCcA0265B15133E04926a7fE518b1c31a4acDC78" // put into .env
                const contract = NFT.attach(CONTRACT_ADDRESS);
                const newItemId = await contract.mint(WALLET_ADDRESS, URI);
                console.log('\nNew NFT Minted!')
                console.log('\nStep-7 Complete')
                resolve(newItemId)
            }
            main().then(() => process.exit(0)).catch(error => {
                console.error(error);
                process.exit(1);
            });
        })
    })
}

const mint = async (rgb) => {

    const get_id = await new_id()
    const generated_png = get_id + ".png"

    let fe_metadata = {
        id: get_id,
        CdR1: rgb.CdR1,
        CdG1: rgb.CdG1,
        CdB1: rgb.CdB1,
        CdR2: rgb.CdR2,
        CdG2: rgb.CdG2,
        CdB2: rgb.CdB2,
        CdR3: rgb.CdR3,
        CdG3: rgb.CdG3,
        CdB3: rgb.CdB3
    }
    console.log(fe_metadata)

    // let initiate = await testBreedNFT(new_metadata_location, get_id) // Step-0
    // console.log(initiate)
    // let read_meta = await readNFTMetadata(new_metadata_location) // Step-1
    // console.log(read_meta)
    let append_csv = await writetoCSV(fe_metadata, generator_datatable) // Step-2
    console.log(append_csv)
    let call_gen = await callGenerator(get_id)
    console.log(call_gen)
    let watch_mint = await watchPNG(generator_png_dir, generated_png) // Step-3
    console.log(watch_mint)
    let png_hash = await pinPNG(generator_png_dir, generated_png) // Step-4
    let write_meta = await appendDNA(new_metadata_location, meta_with_png_location, png_hash) // Step-5
    console.log(write_meta)
    let send_nft = await pinNFT(meta_with_png_location) // Step-6
    let mint_nft = await mintNFT(send_nft) // Step-7
    // sleep.sleep(5)
    console.log('\nNew NFT Contract:\n', mint_nft)
}


async function randomMintGen(dna) {
    const append_csv = await writetoCSV(dna, generator_datatable) // Step-2
    console.log(append_csv)
    console.log('yyy', dna.ipfss.split(',', 1))
    const call_gen = await callGenerator(dna.ipfss.split(',', 1))
    console.log(call_gen)
    // let watch_mint = await watchPNG(generator_png_dir, generated_png) // Step-3
    // console.log(watch_mint)
    // let png_hash = await pinPNG(generator_png_dir, generated_png) // Step-4
    // let write_meta = await appendDNA(new_metadata_location, meta_with_png_location, png_hash) // Step-5
    // console.log(write_meta)
    // let send_nft = await pinNFT(meta_with_png_location) // Step-6
    // let mint_nft = await mintNFT(send_nft) // Step-7
    // sleep.sleep(5)
    // console.log('\nNew NFT Contract:\n', mint_nft)
}


app.post(RANDOM_ENDPOINT, (req, res) => {
    console.log('good', req.body)
    randomMintGen(req.body)
    res.send('')
})

app.post(ID_ENDPOINT, (req, res) => {
    console.log('good', req.body)
    URI_IPFS(req.body)
    res.send('')
})

app.post(EASY_ENDPOINT, (req, res) => {
    console.log('good-easy', req.body)
    easy_breed(req.body.parent1, req.body.parent2)
    res.send('')
})

app.post(BREED_ENDPOINT, (req, res) => {
    console.log('good', req.body)
    breed(req.body.parent1, req.body.parent2)
    res.send('')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
