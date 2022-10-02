import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../system/Database';

export class Vehicle extends Model {
    public brand: string;
    public model: string;
    public color: string;
}

Vehicle.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        brand: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'Vehicles',
        paranoid: true
    }
);

(async() => {
    await sequelize.sync({ force: true });
})();