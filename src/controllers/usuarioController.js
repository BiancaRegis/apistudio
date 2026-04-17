// src/controllers/usuarioController.js
import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

export const usuarioCreateSchema = Joi.object({
    tipoUsuario: Joi.string().valid('admin', 'cliente').required(),
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    telefone: Joi.number().allow(null)
});

export const usuarioUpdateSchema = Joi.object({
    tipoUsuario: Joi.string().valid('admin', 'cliente'),
    nome: Joi.string(),
    email: Joi.string().email(),
    senha: Joi.string(),
    telefone: Joi.number().allow(null)
}).min(1);

//LISTAR USUÁRIOS

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.findAll();

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
        const { idUsuario } = req.params;

        const usuario = await usuarioService.findById(idUsuario);

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

        const { email } = req.body;

        // verifica se email já existe
        const usuarioExistente = await usuarioService.findByEmail(email);

        if (usuarioExistente) {
            return res.status(400).json({
                message: "este email já está cadastrado."
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
        const { idUsuario } = req.params;

        const { error } = usuarioUpdateSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const atualizado = await usuarioService.update(idUsuario, req.body);

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
        const { idUsuario } = req.params;

        const removido = await usuarioService.remove(idUsuario);

        if (!removido) {
            return res.status(404).json({
                message: "usuário não encontrado."
            });
        }

        res.status(200).json({
            message: "usuário removido com sucesso."
        });

    } catch (error) {

        //TRATAMENTO ESPECÍFICO DO ERRO DO MYSQL
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({
                message: "não é possível excluir usuário vinculado a outros dados."
            });
        }

        //ERRO GENÉRICO
        console.error('erro ao remover usuário:', error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};