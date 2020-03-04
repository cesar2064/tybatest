import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { UserTransactionEntity } from './user-transaction.entity';

@Table({
    tableName: 'users',
    indexes: [
        {
            unique: true,
            fields: [
                'email'
            ]
        }
    ]
})
export class UserEntity extends Model<UserEntity> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        validate: {
            isUUID: 4
        },
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column({
        type: DataType.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    })
    email: string;

    @Column({
        type: DataType.CHAR(128),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    password: string;

    @HasMany(() => UserTransactionEntity, 'user_id')
    userTransactions: UserTransactionEntity[];
}