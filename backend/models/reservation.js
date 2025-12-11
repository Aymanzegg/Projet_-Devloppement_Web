const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Reservation extends Model {}

Reservation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        startDate: {
            type: DataTypes.DATEONLY, 
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "PENDING", 
            validate: {
                isIn: [["PENDING", "CONFIRMED", "CANCELLED"]] 
            }
        },
        
        clientName: { 
            type: DataTypes.STRING,
            allowNull: true 
        }
    },
    {
        sequelize: connection,
        tableName: "reservations",
        underscored: true
    }
);

module.exports = Reservation;
