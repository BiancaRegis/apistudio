import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioService.js';

export const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await usuarioService.findByEmail(email);

        if (!usuario) {
            return res.status(401).json({
                message: "Credenciais inválidas"
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                message: "Credenciais inválidas"
            });
        }


        const payload = {
            idUsuario: usuario.idUsuario,
            email: usuario.email,
            tipoUsuario: usuario.tipoUsuario
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login realizado com sucesso",
            token
        });

    } catch (error) {
        console.error('erro no login:', error);
        res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
};
