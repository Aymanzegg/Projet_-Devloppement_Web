const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { connection } = require("../lib/db");

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "USER",
            validate: {
                isIn: [["USER", "ADMIN"]]
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: connection,
        tableName: "users",
        underscored: true,
    }
);


User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
});


User.addHook("beforeUpdate", async (user, options) => {
    if (options.fields.includes("password")) {
        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    }
});

module.exports = User;
