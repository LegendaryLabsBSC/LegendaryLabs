// import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const customConfig = {
  dictionaries: [animals, colors],
  length: 1,
};

const prefix = uniqueNamesGenerator(customConfig);
const postfix = uniqueNamesGenerator(customConfig);

console.log(`Prefix: ${prefix}`)
console.log(`Postfix: ${postfix}`)