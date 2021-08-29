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
const prompt = require('prompt-sync')()
const express = require('express')
const bodyParser = require('body-parser')
const { idText } = require('typescript')
const fetch = require('node-fetch')
const IPFSGatewayTools = require('@pinata/ipfs-gateway-tools/dist/node')


// env variables

require('dotenv').config();
const pinataApiKey = process.env.YOURAPIKEY;
const pinataSecretApiKey = process.env.YOURSECRETKEY;
const gatewayTools = new IPFSGatewayTools();

// File/Directory paths

const new_metadata_location = path.join(__dirname, '../test_data/mint_test_metadata.json')
const meta_with_png_location = path.join(__dirname, '../test_data/updated_metadata.json')
const generator_datatable = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Files/dataPhoenix.csv')
const generator_png_dir = path.join(__dirname, '../phoenixGenerator_1.1/Engine/Content/Images/')



function writetoCSV(metadata, dt) {
    return new Promise(resolve => {
        setTimeout(() => {

            var newLine = '\r\n';
            // var new_metadata = JSON.parse(fs.readFileSync(metadata, 'ascii'));
            var new_metadata = metadata

            fs.stat(dt, function (err, stat) {
                if (err == null) {
                    console.log('\nDatatable discovered');

                    var csv = json2csv(new_metadata, { header: false }) + newLine;

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