import providerBase from './base';
import apiUri from '../constants/uri';

class _pocApi {
    config = {};

    constructor(config = {}) {
        this.provider = providerBase;
        this.config = config;
        this.provider.config = config;
    }


    async getdeviceById(deviceId, options = {}) {
        return this.provider.get(
            apiUri.DEVICE(deviceId),
            options,
        );
    }
}

export const pocApi = new _pocApi();
