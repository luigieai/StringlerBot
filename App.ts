import {Sequelize} from 'sequelize-typescript';
import DiscordHandler from './DiscordHandler';
import Offense from './models/Offense';
import * as config from './botconfig';

let host : string = config.database.host;
let database : string = config.database.database;
let username : string = config.database.username;
let password : string = config.database.password;
let devMode : boolean = process.env.NODE_ENV == 'development' || false;
let token :  string; 

if(devMode){
    token = config.token.devtoken;
} else token = config.token.token;

export const sequelize = new Sequelize({
    host: host,
    database: database,
    dialect: 'mysql',
    username: username,
    password: password,
    modelPaths: [__dirname + '/models']
});


sequelize.authenticate().then( () => {
    Offense.sync().then(() => new DiscordHandler(token));
}).catch( err => {
    console.error('Nao foi possivel conectar a database');
});
