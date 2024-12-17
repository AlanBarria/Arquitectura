import { DataTypes } from "sequelize";
import db from "../database/db.js";

const UsuarioModel = db.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING, unique: true },
    contrasena: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
}, {
    timestamps: false
});

export default UsuarioModel;
