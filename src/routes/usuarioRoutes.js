import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import validate from '../middlewares/validate.js';
import {
    usuarioCreateSchema,
    usuarioUpdateSchema
} from '../controllers/usuarioController.js';

// futuramente usar:
// import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// CRIAR USUÁRIO
router.post('/', validate(usuarioCreateSchema),usuarioController.criarUsuario);

// LISTAR TODOS
router.get('/', usuarioController.listarUsuarios);

// LISTAR POR ID
router.get('/:idUsuario', usuarioController.listarUsuarioId);

// ATUALIZAR
router.put('/:idUsuario', validate(usuarioUpdateSchema), usuarioController.atualizarUsuario);

// DELETAR
router.delete('/:idUsuario', usuarioController.removerUsuario);

export default router;
