const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const dbName = 'cromwell';
const configs = {
    'development': {
        'application': {
            'path': 'api',
            'version': 'v1',
            'name': `${dbName}`,
            'domain': 'localhost',
            'port': 3000
        },
        'mongodb': {
            'url': `mongodb://localhost:27017/${dbName}`
        },
        'swagger': {
            'path': 'api-docs'
        }
    }
};

module.exports = configs[environment];