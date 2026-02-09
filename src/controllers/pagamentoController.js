import * as pagamentoService from '../services/pagamentoService.js';
import Joi from 'joi';

export const pagamentoCreateSchema = Joi.object({
    idPagamento: Joi.string().allow(''),
    dataPagamento: Joi.string().required(),
    valorPago: Joi.string().required(),
    metodo: Joi.string().allow(''),
    situacao: Joi.string().allow(''),
    idMatricula: Joi.string().required()
});

export const pagamentoUpdateSchema = Joi.object({
    dataPagamento: Joi.string(),
    valorPago: Joi.string(),
    metodo: Joi.string().allow(''),
    situacao: Joi.string().allow(''),
    idMatricula: Joi.string()
}).min(1);

export const listarPagamentos = async (req, res) => {
    try {
        const {
            idPagamento,
            dataPagamento,
            valorPago,
            metodo,
            situacao,
            idMatricula
        } = req.query;

        const pagamentos = await pagamentoService.findAll(
            idPagamento,
            dataPagamento,
            valorPago,
            metodo,
            situacao,
            idMatricula
        );

        if (pagamentos.length === 0) {
            return res.status(404).json({
                message: "nenhum pagamento encontrado com esses filtros."
            });
        }

        res.status(200).json(pagamentos);

    } catch (err) {
        console.error('erro ao buscar pagamentos:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

export const adicionarPagamento = async (req, res) => {
    try {
        const novoPagamento = await pagamentoService.create(req.body);

        res.status(201).json({
            message: 'pagamento adicionado com sucesso',
            data: novoPagamento
        });

    } catch (err) {
        console.error('erro ao adicionar pagamento:', err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'ID já cadastrado.' });
        }

        res.status(500).json({ error: 'erro ao adicionar pagamento' });
    }
};

export const atualizarPagamento = async (req, res) => {
    try {
        const { idPagamento } = req.params;

        const update = await pagamentoService.update(idPagamento, req.body);

        if (!update) {
            return res.status(404).json({ error: 'pagamento não encontrado' });
        }

        res.status(200).json({ message: 'pagamento atualizado com sucesso' });

    } catch (err) {
        console.error('erro ao atualizar pagamento:', err);
        res.status(500).json({ error: 'erro ao atualizar pagamento' });
    }
};

export const deletarPagamento = async (req, res) => {
    try {
        const { idPagamento } = req.params;

        const deleted = await pagamentoService.remove(idPagamento);

        if (!deleted) {
            return res.status(404).json({ error: 'pagamento não encontrado' });
        }

        res.status(200).json({ message: 'pagamento deletado com sucesso' });

    } catch (err) {
        console.error('erro ao deletar pagamento:', err);
        res.status(500).json({ error: 'erro ao deletar pagamento' });
    }
};

