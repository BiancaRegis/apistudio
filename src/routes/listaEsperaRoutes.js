import express from 'express';
import {
    adicionarLista,
    listarEspera,
    atualizarLista,
    deletarLista,
    listaEsperaCreateSchema,
    listaEsperaUpdateSchema
} from '../controllers/listaEsperaController.js';

import validate from '../middlewares/validate.js';

const router = express.Router();

//Criar lista de espera
router.post('/', validate(listaEsperaCreateSchema), adicionarLista);

//Listar lista de espera
router.get('/', listarEspera);

//Atualizar lista de espera
router.put('/:idLista', validate(listaEsperaUpdateSchema), atualizarLista);

//Deletar lista de espera
router.delete('/:idLista', deletarLista);

export default router;
