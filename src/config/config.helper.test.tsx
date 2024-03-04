import config from './config.helper';
import devConfig from './dev.json';

describe('Configuration helper tests', () => {

    it('should load dev config by default', () => {
        expect(config).toEqual(devConfig);
    });

    it('should get prod config when NODE_ENV is set to production', () => {
        
    });

});
