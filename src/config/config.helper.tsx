/* eslint-disable @typescript-eslint/no-implicit-any-catch */
/* 
    Set configuration file depending on the environment.
    dev.json is the default configuration file.
*/
let config = require('./dev.json');

if (process.env.REACT_APP_ENV === 'staging') {
    try {
        const stagingConfig = require('./staging.json');
        config = { ...config, ...stagingConfig };
    } catch (error) {
        console.error('Could not load staging configuration file', error);
    }
}

export default config;
