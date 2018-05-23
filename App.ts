import {Sequelize} from 'sequelize-typescript';
import DiscordHandler from './DiscordHandler';
import Offense from './models/Offense';

export const sequelize = new Sequelize({
    host: '127.0.0.1',
    database: "stringler",
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    modelPaths: [__dirname + '/models']
});


sequelize.authenticate().then( () => {
    Offense.sync();
    new DiscordHandler();
}).catch( err => {
    console.error('Nao foi possivel conectar a database');
});