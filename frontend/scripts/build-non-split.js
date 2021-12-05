const rewire = require('rewire')
const cssExtract = require('mini-css-extract-plugin')
const defaults = rewire('react-scripts/scripts/build.js')
let config = defaults.__get__('config')

const DIRS = {
    root: 'static',
    js: 'js',
    css: 'css'
}

const OUTPUT_FNAME = {
    js: `${DIRS.root}/${DIRS.js}/[name].js`,
    css: `${DIRS.root}/${DIRS.css}/[name].css`
}

config.optimization.splitChunks = {
    cacheGroups: { default: false }
}

console.log('\n\n')
console.log('BUILD NON-SPLIT START')
console.log('---------------------')

// Renames main.[contenthash:8].js to main.js
let jsbefore = config.output.filename
config.output.filename = OUTPUT_FNAME.js
config.output.chunkFilename = OUTPUT_FNAME.js
console.info(`RENAME: ${jsbefore} to ${OUTPUT_FNAME.js}`)

// Renames main.[contenthash:8].css to main.css
for (var i = 0; i < config.plugins.length; i++) {
    if (config.plugins[i] instanceof cssExtract) {
        let cssBefore = config.plugins[i].options.filename
        config.plugins[i].options.filename = OUTPUT_FNAME.css
        config.plugins[i].options.chunkFilename = OUTPUT_FNAME.css
        config.plugins[i].options.moduleFilename = () => OUTPUT_FNAME.css
        console.info(`RENAME: ${cssBefore} to ${OUTPUT_FNAME.css}`)
        break
    }
}

console.log('---------------------')
console.log('BUILD NON-SPLIT ENDED')
console.log('\n\n')