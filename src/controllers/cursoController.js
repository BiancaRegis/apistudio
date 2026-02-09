import * as cursoService from '../services/cursoService.js';
import Joi from 'joi';

export const cursoCreateSchema = Joi.object({
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    cargaHoraria: Joi.number().required(),
    nivel: Joi.number().required(),
    situacao: Joi.string().required()
});

export const cursoUpdateSchema = Joi.object({
    titulo: Joi.string(),
    descricao: Joi.string(),
    cargaHoraria: Joi.string(),
    nivel: Joi.string(),
    situacao: Joi.string(),
}).min(1);
//Listar todos os produtos
export const listarCursos = async (req, res) => {
    try {

        const { idCurso, titulo, cargaHoraria, nivel, situacao } = req.query;

const cursos = await cursoService.findAll(
    idCurso, titulo, cargaHoraria, nivel,situacao);

        if (cursos.length === 0) {
            return res.status(404).json({ message: "nenhum curso encontrado com esses filtros."});
        }
        res.status(200).json(cursos);
    } catch (err) {
        console.error('erro ao buscar cursos:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

//Adicionar novo produto
export const adicionarCurso = async (req, res) => {
    try {
        const novoCurso = await cursoService.create(req.body);
        res.status(201).json({ message: 'curso adicionado com sucesso', data: novoCurso });
    } catch (err) {
        console.error('erro ao adicionar curso:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({error: 'ID já cadastrado.'});
        }
        res.status(500).json({ error: 'erro ao adicionar curso' });
    }
};

//Atualizar produto
export const atualizarCurso = async (req, res) => {
    try {
        const { idCurso } = req.params;

        const update = await cursoService.update(idCurso, req.body);
        if (!update) {
            return res.status(404).json({ error: 'curso não encontrado' });
        }
        res.status(200).json({ message: 'curso atualizado com sucesso' });
    } catch (err) {
        console.error('erro ao atualizar curso:', err);
        res.status(500).json({ error: 'erro ao atualizar curso' });
    }
};

//Deletar produto
export const deletarCurso = async (req, res) => {
    try {
        const { idCurso} = req.params;
        const deleted = await cursoService.remove(idCurso);
        if (!deleted) {
            return res.status(404).json({ error: 'curso não encontrado' });
        }
        res.status(200).json({ message: 'curso deletado com sucesso' });
    } catch (err) {
        console.error('erro ao deletar curso:', err);
        res.status(500).json({ error: 'erro ao deletar curso' });
    }
};
