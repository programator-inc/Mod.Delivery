var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./db')[env];
console.log(config);

module.exports = () => {

    console.log("Setting Databases");
    mongoose.Promise = global.Promise;
    var envUrl = process.env[config.use_env_variable];
    var localUrl = `mongodb://${config.host}/${config.database}`;
    var mongoUrl = envUrl ? envUrl : localUrl;
    console.log(mongoUrl);

    // Connecting to the database
    return mongoose.connect(mongoUrl, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });
};