import * as turmaService from '../services/turmaService.js';
import Joi from 'joi';

export const turmaCreateSchema = Joi.object({
    dataInicio: Joi.date().iso().allow(''),
    dataFinal: Joi.date().iso().allow(''),
    horario: Joi.string().required(), 
    vagas: Joi.number().min(1).required(),
    endereco: Joi.string().min(3).required(),
    preco: Joi.number().min(0).required(),
    situacao: Joi.string().valid('aberta', 'fechado').required(),
    idCurso: Joi.number().required()
});


export const turmaUpdateSchema = Joi.object({
    dataInicio: Joi.date().iso().allow(''),
    dataFinal: Joi.date().iso().allow(''),
    horario: Joi.string(),
    vagas: Joi.number().min(1),
    endereco: Joi.string().min(3),
    preco: Joi.number().min(0),
    situacao: Joi.string().valid('aberta', 'fechado'),
    idCurso: Joi.number()
}).min(1);

export const listarTurmas = async (req, res) => {
    try {

        const { idTurma, dataInicio, dataFinal, horario, vagas, preco, situacao, idCurso } = req.query;

const turmas = await turmaService.findAll(
    idTurma, dataInicio, dataFinal, horario, vagas, preco, situacao, idCurso);

        if (turmas.length === 0) {
            return res.status(404).json({ message: "nenhuma turma encontrada com esses filtros."});
        }
        res.status(200).json(turmas);
    } catch (err) {
        console.error('erro ao buscar turmas:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

export const adicionarTurma = async (req, res) => {
    try {
        const novaTurma = await turmaService.create(req.body);

        res.status(201).json({
            message: 'turma nova adicionada com sucesso',
            data: novaTurma
        });

    } catch (err) {

        if (err.code === 'CURSO_NAO_EXISTE') {
            return res.status(400).json({
                message: 'curso informado não existe.'
            });
        }

        //
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                message: 'curso inválido.'
            });
        }

        //ID duplicado
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                error: 'ID já cadastrado.'
            });
        }

 
        console.error('erro ao adicionar turma:', err);
        res.status(500).json({ error: 'erro ao adicionar turma' });
    }
};

export const atualizarTurma = async (req, res) => {
    try {
        const { idTurma } = req.params;

        const update = await turmaService.update(idTurma, req.body);
        if (!update) {
            return res.status(404).json({ error: 'turma não encontrada' });
        }
        res.status(200).json({ message: 'turma atualizada com sucesso' });
    } catch (err) {
        console.error('erro ao atualizar turma:', err);
        res.status(500).json({ error: 'erro ao atualizar turma' });
    }
};

export const deletarTurma = async (req, res) => {
    try {
        const {idTurma} = req.params;
        const deleted = await turmaService.remove(idTurma);
        if (!deleted) {
            return res.status(404).json({ error: 'turma não encontrada' });
        }
        res.status(200).json({ message: 'turma deletada com sucesso' });
    } catch (err) {
        console.error('erro ao deletar turma:', err);
        res.status(500).json({ error: 'erro ao deletar turma' });
    }
};