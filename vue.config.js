// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000, // la taille minimum par paquet
                maxSize: 200000, // la taille maximum ... 
            }
        },

        devServer: {
            compress: true,
            disableHostCheck: true,   // That solved it

        }        
    }
}