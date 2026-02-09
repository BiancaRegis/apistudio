import express from 'express';
import * as matriculaController from '../controllers/matriculaController.js';
import validate from '../middlewares/validate.js';
import {
    matriculaCreateSchema,
    matriculaUpdateSchema
} from '../controllers/matriculaController.js';

const router = express.Router();

//Criar matrícula
router.post(
    '/',
    validate(matriculaCreateSchema),
    matriculaController.adicionarMatricula
);

//Listar matrículas
router.get('/', matriculaController.listarMatriculas);

//Atualizar matrícula
router.put(
    '/:idMatricula',
    validate(matriculaUpdateSchema),
    matriculaController.atualizarMatricula
);

//Deletar matrícula
router.delete('/:idMatricula', matriculaController.deletarMatricula);

export default router;
