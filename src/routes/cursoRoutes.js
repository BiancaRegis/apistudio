import express from 'express';
import * as cursoController from '../controllers/cursoController.js';
import validate from '../middlewares/validate.js';
import { cursoCreateSchema, cursoUpdateSchema } from '../controllers/cursoController.js';

const router = express.Router();

router.post('/', validate(cursoCreateSchema), cursoController.adicionarCurso);

router.get('/', cursoController.listarCursos);

router.put('/:idCurso', validate(cursoUpdateSchema), cursoController.atualizarCurso);

router.delete('/:idCurso', cursoController.deletarCurso);

export default router;