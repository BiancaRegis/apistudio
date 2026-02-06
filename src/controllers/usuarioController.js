import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

export const usuarioCreateSchema = Joi.object ({

    idUsuario: Joi.string().required(),
    tipoUsuario: Joi.string().required(),
    nome: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    senha: Joi.string().min(8).required(),
    telefone: Joi.string().allow(''),
});

export const usuarioUpdateSchema = Joi.object({
    idUsuario: Joi.string(),
    tipoUsuario: Joi.string(),
    nome: Joi.string().max(100),
    email: Joi.string().email(),
    senha: Joi.string().min(8),
    telefone: Joi.string().allow(''),
}).min(1);

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('erro ao buscar usuario:', err);
        res.status(500).json({ error: 'erro interno do servidor'});
    }
};

export const listarUsuarioId = async (req, res) => {
    try {
        const {idUsuario} = req.params;
        const usuario = await usuarioService.findById(idUsuario);
        if (!idUsuario) {
            return res.status(400).json({ error: 'usuário não encontrado'});
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('erro ao buscar usuário', err);
        res.status(500).json({ error: 'erro interno do servidor'});
    }
};

export const adicionarUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuarioService.create(req.body);
        res.status(201).json({ message: 'usuário adicionado com sucesso', data: novoUsuario});
    } catch (error) {
        console.error('erro ao adicionar usuário:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'usuário já cadastrado'});
        }
    }
};

export const atualizarUsuario = async (req, res) => {
    try {
        const {idUsuario} = req.params;
        const update = await usuarioService.update(idUsuario, req.body);
        if (!update) {
            return res.status(404).json({ error: 'usuário não encontrado'});
        }
        res.status(200).json({ message: 'usuário atualizado com sucesso'});
    } catch (error) {
        console.error('erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'erro ao atualizar usuário'});
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        const {idUsuario} = req.params;
        const deleted = await usuarioService.remove(idUsuario);
        if (!deleted) {
            return res.status(404).json({ error: 'erro ao deletar cliente'});
        }
        res.status(200).json({ message: 'usuário deletado com sucesso'});
    } catch (error) {
        console.error('erro ao deletar usuário:', err);
        res.status(500).json({ error: 'error ao deletar cliente'});
    }
};