import * as listaEsperaService from '../services/listaEsperaService.js';
import Joi from 'joi';

export const listaEsperaCreateSchema = Joi.object({
    idLista: Joi.string().allow(''),
    dataSolicitacao: Joi.date().required(),
    situacao: Joi.string().allow(''),
    idUsuario: Joi.string().required(),
    idTurma: Joi.string().required()
});

export const listaEsperaUpdateSchema = Joi.object({
    idLista: Joi.string(),
    dataSolicitacao: Joi.date(),
    situacao: Joi.string().allow(''),
    idUsuario: Joi.string(),
    idTurma: Joi.string(),
}).min(1);

export const listarEspera = async (req, res) => {
    try {
        const { idLista, dataSolicitacao, situacao, idUsuario, idTurma } = req.query;

        const lista = await listaEsperaService.findAll(
            idLista,
            dataSolicitacao,
            situacao,
            idUsuario,
            idTurma
        );

        if (lista.length === 0) {
            return res.status(404).json({
                message: "nenhuma lista de espera encontrada com esses filtros."
            });
        }

        res.status(200).json(lista);
    } catch (err) {
        console.error('erro ao buscar lista de espera:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

export const adicionarLista = async (req, res) => {
    try {
        const novaLista = await listaEsperaService.create(req.body);

        res.status(201).json({
            message: 'lista de espera adicionada com sucesso',
            data: novaLista
        });

    } catch (err) {
        console.error('erro ao adicionar lista de espera:', err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'ID já cadastrado.' });
        }

        res.status(500).json({ error: 'erro ao adicionar lista de espera' });
    }
};

export const atualizarLista = async (req, res) => {
    try {
        const { idLista } = req.params;

        const update = await listaEsperaService.update(idLista, req.body);

        if (!update) {
            return res.status(404).json({ error: 'lista de espera não encontrada' });
        }

        res.status(200).json({ message: 'lista de espera atualizada com sucesso' });

    } catch (err) {
        console.error('erro ao atualizar lista de espera:', err);
        res.status(500).json({ error: 'erro ao atualizar lista de espera' });
    }
};

export const deletarLista = async (req, res) => {
    try {
        const { idLista } = req.params;

        const deleted = await listaEsperaService.remove(idLista);

        if (!deleted) {
            return res.status(404).json({ error: 'lista de espera não encontrada' });
        }

        res.status(200).json({ message: 'lista de espera deletada com sucesso' });

    } catch (err) {
        console.error('erro ao deletar lista de espera:', err);
        res.status(500).json({ error: 'erro ao deletar lista de espera' });
    }
};
