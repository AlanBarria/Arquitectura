import { DataTypes } from "sequelize";
import db from "../database/db.js";

const PublicacionModel = db.define('publicaciones', {
    id_publicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Establece 'id_publicacion' como la clave primaria
        autoIncrement: true // Autoincremental
    },
    destino: { 
        type: DataTypes.STRING,
        allowNull: false // Asegura que este campo no sea nulo
    },
    salida: { 
        type: DataTypes.STRING,
        allowNull: false // Asegura que este campo no sea nulo
    },
    id_usuario: { 
        type: DataTypes.INTEGER,
        allowNull: false, // Asegura que este campo no sea nulo
        references: {
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id_usuario' // Clave primaria en la tabla referenciada
        }
    }
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

export default PublicacionModel;
