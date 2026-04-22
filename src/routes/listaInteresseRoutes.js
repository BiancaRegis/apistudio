import { Router } from 'express';
import * as controller from '../controllers/listaInteresseController.js';
import validate from '../middlewares/validate.js';
import { listaSchema } from '../controllers/listaInteresseController.js';

const router = Router();

router.post('/', validate(listaSchema), controller.criarLista);
router.get('/', controller.listarTodos);
router.get('/usuario/:idUsuario', controller.porUsuario);
router.get('/curso/:idCurso', controller.porCurso);
router.put('/:id', validate(controller.listaUpdate), controller.atualizarLista);
router.delete('/:id', controller.remover);

export default router;
