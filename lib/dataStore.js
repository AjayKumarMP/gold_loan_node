import * as config from '../config/dataStore';

const DataStore = require('@google-cloud/datastore');

const { project, keyfile } = config;

const dataStoreClient = new DataStore({
    projectId   : project,
    keyFilename : keyfile,
});

export default dataStoreClient;
