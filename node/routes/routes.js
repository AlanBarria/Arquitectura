import express from "express";
import { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario, registrarUsuario, loginUsuario } from '../controllers/UsuarioController.js';
import { getAllPublicaciones, getPublicacion, createPublicacion, updatePublicacion, deletePublicacion } from '../controllers/PublicacionController.js';

const router = express.Router();
router.post('/registro', registrarUsuario); 
router.post('/login', loginUsuario);
router.get("/", getAllUsuarios);
router.get("/:id", getUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

router.get('/', getAllPublicaciones);
router.get('/:id', getPublicacion);
router.post('/', createPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);




export default router;
