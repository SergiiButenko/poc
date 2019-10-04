export const apiUri = {
    SENSOR: (sensorId='') => `api/touchPoints/${sensorId}`,
    SENSORS: 'api/touchPoints',
    VISIT: (visitId='') => `api/visits/${visitId}`,
    VISITS: 'api/visits/',
    STATISTICS: 'api/statistics/',
};