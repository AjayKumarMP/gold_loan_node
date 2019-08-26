const dbConfig = {
    production: {
        project : 'dbudddy-in',
        keyfile : `${process.cwd()}/json-keyfile/sandbox_key.json`,
    },
    preprod: {
        project : 'dbudddy-in',
        keyfile : `${process.cwd()}/json-keyfile/sandbox_key.json`,
    },
    staging: {
        project : 'dbudddy-in',
        keyfile : `${process.cwd()}/json-keyfile/sandbox_key.json`,
    },
    development: {
        project : 'dbudddy-in',
        keyfile : '/json-keyfile/sandbox_key.json',
    },
    test: {
        project : 'dbudddy-in',
        keyfile : `${process.cwd()}/json-keyfile/sandbox_key.json`,
    },
};

const config = dbConfig[process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'];
console.log(config, process.env.NODE_ENV);

export default config;
