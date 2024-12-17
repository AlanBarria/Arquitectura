import { DataTypes } from "sequelize";
import db from "../database/db.js";

const PublicacionModel = db.define('publicaciones', {
    id_publicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Establece 'id_publicacion' como la clave primaria
        autoIncrement: true // Autoincremental
    },
    latitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false // Asegura que este campo no sea nulo
    },
    longitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false // Asegura que este campo no sea nulo
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que este campo no sea nulo
    }
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

export default PublicacionModel;
