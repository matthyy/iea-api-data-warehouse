'use strict';

const path = require('path');

const csv = require('csvtojson');
const {MongoClient} = require('mongodb');

const clinicFilePath = './TaskBdata.csv';

function importData() {
    MongoClient.connect(process.env.MONGO_URL, function(err, client) {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Connected successfully to server');
        const arrVar = process.env.MONGO_URL.split('/');
        const db = client.db(arrVar[arrVar.length - 1]);
        const renewableStoreCollection = db.collection('renewablestores')

        return readCsv().then(async(renewableData) => {
            const formattedRenewableData = renewableData.map((item)=> {
                return {
                    ...item,
                    year: parseInt(item.year),
                    nbVehicle: parseFloat(item.nbVehicle),
                    nbCharger: parseFloat(item.nbCharger)
                }
            })

            await renewableStoreCollection.insertMany(formattedRenewableData)
            await client.close();
        }).catch((e) => {
            console.error(e);
        });
    });
}

function readCsv() {
    const pathToFile = path.join(__dirname, clinicFilePath);
    return csv({delimiter: ';'}).fromFile(pathToFile);
}

importData();
