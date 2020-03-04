import { Table, Column, DataType, ForeignKey, BelongsTo, Model } from 'sequelize-typescript';
import { UserTransactionName } from '../models/user-transaction.model';
import { UserEntity } from './user.entity';

@Table({
    tableName: 'user_transactions',
    indexes: [
        {
            using: 'BTREE',
            fields: [
                'user_id'
            ]
        }
    ]
})
export class UserTransactionEntity extends Model<UserTransactionEntity> {
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
        allowNull: false,
        type: DataType.STRING,
        validate: {
            notEmpty: true
        }
    })
    name: UserTransactionName;

    @ForeignKey(() => UserEntity)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        validate: {
            isUUID: 4
        }
    })
    userId: string;

    @BelongsTo(()=>UserEntity, 'user_id')
    user: UserEntity;
}