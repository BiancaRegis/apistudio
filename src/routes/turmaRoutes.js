import express from 'express';
import * as turmaController from '../controllers/turmaController.js';
import validate from '../middlewares/validate.js';
import { turmaCreateSchema, turmaUpdateSchema } from '../controllers/turmaController.js';


const router = express.Router();

// criação (POST /api/turmas)
router.post('/', validate(turmaCreateSchema), turmaController.adicionarTurma);

// proteger rotas daqui pra baixo futuramente
// router.use(authMiddleware);

// listar (GET /api/turmas)
router.get('/', turmaController.listarTurmas);

// atualizar (PUT /api/turmas/:idTurma)
router.put('/:idTurma', validate(turmaUpdateSchema), turmaController.atualizarTurma);

// deletar (DELETE /api/turmas/:idTurma)
router.delete('/:idTurma', turmaController.deletarTurma);

export default router;
