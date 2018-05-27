import {Sequelize} from 'sequelize-typescript';
import DiscordHandler from './DiscordHandler';
import Offense from './models/Offense';
import * as config from './botconfig';

console.log(config.database.host);
console.log(config.database.database);
console.log(config.database.username);
console.log(config.database.password);

let host : string = config.database.host;
let database : string = config.database.database;
let username : string = config.database.username;
let password : string = config.database.password;
let token :  string = config.token.token;

export const sequelize = new Sequelize({
    host: host,
    database: database,
    dialect: 'mysql',
    username: username,
    password: password,
    modelPaths: [__dirname + '/models']
});


sequelize.authenticate().then( () => {
    Offense.sync();
    new DiscordHandler(token);
}).catch( err => {
    console.error('Nao foi possivel conectar a database');
});