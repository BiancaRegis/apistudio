import * as matriculaService from '../services/matriculaService.js';
import Joi from 'joi';

export const matriculaCreateSchema = Joi.object({
    idMatricula: Joi.string().allow(''),
    dataMatricula: Joi.string().required(),
    situacao: Joi.string().allow(''),
    idUsuario: Joi.string().required(),
    idTurma: Joi.string().required()
});

export const matriculaUpdateSchema = Joi.object({
    dataMatricula: Joi.string().allow(''),
    situacao: Joi.string().allow(''),
    idUsuario: Joi.string(),
    idTurma: Joi.string()
}).min(1);

export const listarMatriculas = async (req, res) => {
    try {
        const { idMatricula, dataMatricula, situacao, idUsuario, idTurma } = req.query;

        const matriculas = await matriculaService.findAll(
            idMatricula,
            dataMatricula,
            situacao,
            idUsuario,
            idTurma
        );

        if (matriculas.length === 0) {
            return res.status(404).json({
                message: "nenhuma matrícula encontrada com esses filtros."
            });
        }

        res.status(200).json(matriculas);

    } catch (err) {
        console.error('erro ao buscar matrículas:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

export const adicionarMatricula = async (req, res) => {
    try {
        const novaMatricula = await matriculaService.create(req.body);

        res.status(201).json({
            message: 'matrícula adicionada com sucesso',
            data: novaMatricula
        });

    } catch (err) {
        console.error('erro ao adicionar matrícula:', err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'ID já cadastrado.' });
        }

        res.status(500).json({ error: 'erro ao adicionar matrícula' });
    }
};

export const atualizarMatricula = async (req, res) => {
    try {
        const { idMatricula } = req.params;

        const update = await matriculaService.update(idMatricula, req.body);

        if (!update) {
            return res.status(404).json({ error: 'matrícula não encontrada' });
        }

        res.status(200).json({ message: 'matrícula atualizada com sucesso' });

    } catch (err) {
        console.error('erro ao atualizar matrícula:', err);
        res.status(500).json({ error: 'erro ao atualizar matrícula' });
    }
};

export const deletarMatricula = async (req, res) => {
    try {
        const { idMatricula } = req.params;

        const deleted = await matriculaService.remove(idMatricula);

        if (!deleted) {
            return res.status(404).json({ error: 'matrícula não encontrada' });
        }

        res.status(200).json({ message: 'matrícula deletada com sucesso' });

    } catch (err) {
        console.error('erro ao deletar matrícula:', err);
        res.status(500).json({ error: 'erro ao deletar matrícula' });
    }
};
