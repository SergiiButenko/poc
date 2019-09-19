import providerBase from './base';
import {apiUri} from '../constants/uri';

class _pocApi {
    config = {};

    constructor(config = {}) {
        this.provider = providerBase;

        this.setGlobalConfig(config);
    }

    setGlobalConfig(config) {
        this.config = config;
        this.provider.config = config;
    }

    async getDevices(options = {}) {
        return {devices: [{id: 1}, {id: 2}, {id: 3}]};
        return this.provider.get(
            apiUri.DEVICES,
            options,
        );
    }

    async getDeviceById(deviceId, options = {}) {
        return this.provider.get(
            apiUri.DEVICE(deviceId),
            options,
        );
    }
}

export const pocApi = new _pocApi();
