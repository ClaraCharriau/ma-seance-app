/* eslint-disable @typescript-eslint/no-implicit-any-catch */
/* 
    Set configuration file depending on the environment.
    dev.json is the default configuration file.
*/
let config = require('./dev.json');

if (process.env.NODE_ENV === 'production') {
    try {
        const prodConfig = require('./prod.json');
        config = { ...config, ...prodConfig };
    } catch (error) {
        console.error('Could not load production configuration file', error);
    }
}

export default config;
