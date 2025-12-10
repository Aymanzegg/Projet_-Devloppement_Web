const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Material extends Model {}

Material.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        pricePerDay: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    },
    {
        sequelize: connection, 
        tableName: "materials",
        underscored: true, 
    }
);

module.exports = Material;