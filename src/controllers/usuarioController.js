// src/controllers/usuarioController.js
import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

export const usuarioCreateSchema = Joi.object({
    tipoUsuario: Joi.string().required(),
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    telefone: Joi.number().allow(null)
});

export const usuarioUpdateSchema = Joi.object({
    tipoUsuario: Joi.string(),
    nome: Joi.string(),
    email: Joi.string().email(),
    senha: Joi.string(),
    telefone: Joi.number().allow(null)
});
//LISTAR USUÁRIOS

export const listarUsuarios = async (req, res) => {
    try {
        const {
            idUsuario,
            tipoUsuario,
            nome,
            email
        } = req.query;

        const usuarios = await usuarioService.findAll(
            idUsuario,
            tipoUsuario,
            nome,
            email
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                message: "nenhum usuário encontrado com esses filtros."
            });
        }

        res.status(200).json(usuarios);

    } catch (error) {
        console.error('erro ao buscar usuários:', error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};
//BUSCAR USUÁRIO POR ID

export const listarUsuarioId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioService.findById(id);

        if (!usuario) {
            return res.status(404).json({
                message: "usuário não encontrado."
            });
        }

        res.status(200).json(usuario);

    } catch (error) {
        console.error('erro ao buscar usuário:', error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

//CRIAR USUÁRIO

export const criarUsuario = async (req, res) => {
    try {
        const { error } = usuarioCreateSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const novoUsuario = await usuarioService.create(req.body);

        res.status(201).json({
            message: "usuário criado com sucesso.",
            usuario: novoUsuario
        });

    } catch (error) {
        console.error('erro ao criar usuário:', error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

// USUÁRIO
export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = usuarioUpdateSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const atualizado = await usuarioService.update(id, req.body);

        if (!atualizado) {
            return res.status(404).json({
                message: "usuário não encontrado."
            });
        }

        res.status(200).json({
            message: "usuário atualizado com sucesso."
        });

    } catch (error) {
        console.error('erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

//REMOVER USUÁRIO
export const removerUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const removido = await usuarioService.remove(id);

        if (!removido) {
            return res.status(404).json({
                message: "usuário não encontrado."
            });
        }

        res.status(200).json({
            message: "usuário removido com sucesso."
        });

    } catch (error) {
        console.error('erro ao remover usuário:', error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};
