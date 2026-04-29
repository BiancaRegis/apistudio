import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioService.js';

export const login = async (req, res) => {
    const { email, senha } = req.body;

    try {

        // VALIDA CAMPOS OBRIGATÓRIOS
        if (!email || !senha) {
            return res.status(400).json({
                message: "Email e senha são obrigatórios"
            });
        }

        // VERIFICA SE JWT_SECRET EXISTE
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET não configurado");
        }

        // FORMATA EMAIL
        const emailFormatado = email.trim().toLowerCase();

        // BUSCA USUÁRIO
        const usuario = await usuarioService.findByEmail(emailFormatado);

        if (!usuario) {
            return res.status(401).json({
                message: "Credenciais inválidas"
            });
        }

        // COMPARA SENHA
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                message: "Credenciais inválidas"
            });
        }

        // DADOS DO TOKEN
        const payload = {
            idUsuario: usuario.idUsuario,
            email: usuario.email,
            tipoUsuario: usuario.tipoUsuario
        };

        // GERA TOKEN
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // RESPOSTA DE SUCESSO
        res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            cliente: {
                idUsuario: usuario.idUsuario,
                email: usuario.email,
                tipo: usuario.tipoUsuario,
                nome: usuario.nome
            }
        });

    } catch (error) {
        console.error('erro no login:', error);

        res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
};