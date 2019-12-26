import { Model, Table, PrimaryKey, AutoIncrement, Column, DataType, NotNull } from "sequelize-typescript";

@Table({tableName: 'offense'})
export default class Offense extends Model<Offense> {

    @PrimaryKey
    @AutoIncrement
    @Column
    readonly id: number;
    
    @Column
    name: string;

    @Column
    creator: string;

    @Column(DataType.DATE)
    creation: Date;

    @Column
    approved: boolean;
}
