import PublicacionModel from "../models/PublicacionModel.js";

// Muestra todas las publicaciones
export const getAllPublicaciones = async (req, res) => {
    try {
        const publicaciones = await PublicacionModel.findAll();
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Muestra una publicación
export const getPublicacion = async (req, res) => {
    try {
        const publicacion = await PublicacionModel.findByPk(req.params.id);
        if (publicacion) {
            res.json(publicacion);
        } else {
            res.status(404).json({ message: "Publicación no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crea una nueva publicación
export const createPublicacion = async (req, res) => {
    try {
        const { descripcion, latitud, longitud } = req.body;

        // Validación de los parámetros requeridos
        if (!descripcion || !latitud || !longitud) {
            return res.status(400).json({ message: "Faltan parámetros: descripcion, latitud o longitud" });
        }

        // Crear la publicación
        const publicacion = await PublicacionModel.create({
            descripcion,
            latitud,
            longitud,
        });

        res.status(201).json({
            message: "¡Publicación creada correctamente!",
            publicacion,
        });
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        res.status(400).json({ message: error.message });
    }
};

// Actualiza una publicación
export const updatePublicacion = async (req, res) => {
    try {
        const [updated] = await PublicacionModel.update(req.body, {
            where: {
                id_publicacion: req.params.id,
            },
        });
        if (updated) {
            const updatedPublicacion = await PublicacionModel.findByPk(req.params.id);
            res.json({
                message: "¡Publicación actualizada correctamente!",
                publicacion: updatedPublicacion,
            });
        } else {
            res.status(404).json({ message: "Publicación no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Elimina una publicación
export const deletePublicacion = async (req, res) => {
    try {
        const result = await PublicacionModel.destroy({
            where: {
                id_publicacion: req.params.id,
            },
        });
        if (result === 1) {
            res.json({
                message: "¡Publicación eliminada correctamente!",
            });
        } else {
            res.status(404).json({
                message: "Publicación no encontrada o ya fue eliminada",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
