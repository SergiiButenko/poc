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

    async getSensors(options = {}) {
        return {
            "touchPoints": [
              {
                "id": 1,
                "title": "Coca-Cola",
                "description": "Coca Cola Promotion",
                "type": "INDOOR"
              },
              {
                "id": 2,
                "title": "Meet",
                "description": "Meet promotion",
                "type": "INDOOR"
              }
            ]
           };
        return this.provider.get(
            apiUri.SENSORS,
            options,
        );
    }

    async getSensorById(sensorId, options = {}) {
        return this.provider.get(
            apiUri.SENSORS(sensorId),
            options,
        );
    }

    async getStatistics(options = {}) {
        return {
            "statistics": [
              {
                "touchPoint": 1,
                "averageImpressionTime": 15,
                "impressionsCount": 24
              },
              {
                "touchPoint": 2,
                "averageImpressionTime": 24,
                "impressionsCount": 55
              }
            ]
           };
        return this.provider.get(
            apiUri.STATISTICS,
            options,
        );
    }

    async getVisits(options = {}) {
        return {
            "visits": [
              {
                "id": 1,
                "timestamp": {
                  "date": "2019-10-03 22:38:38.000000",
                  "timezone_type": 3,
                  "timezone": "UTC"
                },
                "path": "2,3,4"
              },
              {
                "id": 2,
                "timestamp": {
                  "date": "2019-10-03 22:40:48.000000",
                  "timezone_type": 3,
                  "timezone": "UTC"
                },
                "path": "4,5,6"
              }
            ]
           };
        return this.provider.get(
            apiUri.VISITS,
            options,
        );
    }

    async getVisitById(visitId, options = {}) {
        return this.provider.get(
            apiUri.VISIT(visitId),
            options,
        );
    }
}

export const pocApi = new _pocApi();
