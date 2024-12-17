import express from 'express';
import { getAllPublicaciones, getPublicacion, createPublicacion, updatePublicacion, deletePublicacion } from '../controllers/PublicacionController.js';

const router = express.Router();

// Rutas para publicaciones
router.get('/', getAllPublicaciones);
router.get('/:id', getPublicacion);
router.post('/', createPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

export default router;
