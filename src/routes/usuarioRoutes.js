import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import validate from '../middlewares/validate.js';
import { usuarioCreateSchema, usuarioUpdateSchema } from '../controllers/usuarioController.js';

import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', validate(usuarioCreateSchema), usuarioController.adicionarUsuario);
// ROTA: POST /api/usuarios

//2 aplica o proteção do login em todas as rotas abaixo desta linha
// router.use(authMiddleware); // //DESCOMENTAR PARA FUNCIONAR
 
// o caminho base '/api/usuarios' já foi definido no index.js
// agora definimos apenas as partes relativas: '/', '/:idUsuario', etc.
 
router.get('/', usuarioController.listarUsuarios);
// ROTA: GET /api/usuarios
router.get('/:idUsuario', usuarioController.listarUsuarioId);
// ROTA: GET /api/usuarios/:idUsuario

router.put('/:idUsuario', validate(usuarioUpdateSchema), usuarioController.atualizarUsuario);
// ROTA: PUT /api/usuarios/:idUsuario

router.delete('/:idUsuario', usuarioController.deletarUsuario);
// ROTA: DELETE /api/usuarios/:idUsuario

export default router;