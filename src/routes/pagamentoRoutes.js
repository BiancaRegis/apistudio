import express from 'express';
import * as pagamentoController from '../controllers/pagamentoController.js';
import validate from '../middlewares/validate.js';
import {
    pagamentoCreateSchema,
    pagamentoUpdateSchema
} from '../controllers/pagamentoController.js';

const router = express.Router();

//Criar pagamento
router.post(
    '/',
    validate(pagamentoCreateSchema),
    pagamentoController.adicionarPagamento
);

//Listar pagamentos
router.get('/', pagamentoController.listarPagamentos);

//Atualizar pagamento
router.put(
    '/:idPagamento',
    validate(pagamentoUpdateSchema),
    pagamentoController.atualizarPagamento
);

//Deletar pagamento
router.delete('/:idPagamento', pagamentoController.deletarPagamento);

export default router;
