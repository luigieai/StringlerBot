import {Sequelize} from 'sequelize-typescript';
import DiscordHandler from './DiscordHandler';
import Offense from './models/Offense';

require('dotenv').config()

let host : string = process.env.HOST;
let database : string = process.env.DATABASE;
let username : string = process.env.USERNAME;
let password : string = process.env.PASSWORD;
let devMode : boolean = process.env.NODE_ENV == 'development' || false;
let token :  string; 

if(devMode){
    token = process.env.DEVTOKEN;
} else token = process.env.TOKEN;

export const sequelize = new Sequelize({
    host: host,
    database: database,
    dialect: 'mysql',
    username: username,
    password: password,
    modelPaths: [__dirname + '/models']
});


sequelize.authenticate().then( () => {
    sequelize.sync().then(() => new DiscordHandler(token));
}).catch( err => {
    console.error('Nao foi possivel conectar a database');
});
