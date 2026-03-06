import { Router } from 'express';
import * as controller from '../controllers/listaInteresseController.js';

const router = Router();

router.post('/', controller.criarLista);
router.get('/usuario/:idUsuario', controller.porUsuario);
router.get('/curso/:idCurso', controller.porCurso);
router.delete('/:id', controller.remover);

export default router;
