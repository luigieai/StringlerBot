import { Model, Table, PrimaryKey, AutoIncrement, Column,} from "sequelize-typescript";

@Table({tableName: 'config_bot'})
export default class ConfigBot extends Model<ConfigBot> {

    @PrimaryKey
    @AutoIncrement
    @Column
    readonly id: number;
    
    @Column
    name: string;

    @Column
    value: string;

    @Column
    readonly serverId: string;
}

