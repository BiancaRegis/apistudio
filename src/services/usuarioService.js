import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async () => {
    const [result] = await db.query('SELECT * FROM usuario');
    return result;
};

export const findById = async (idUsuario) => {
    const [result] = await db.query('SELECT * FROM usuario WHERE idUsuario = ?', [idUsuario]);
    return result.length > 0 ? result[0]: null;
};

export const findByEmail = async (email) => {
    const sql = 'SELECT * FROM usuario WHERE email = ?';
    const[rows] = await db.query(sql, [email]);

    return rows[0] || null;
};

export const create = async (usuarioData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuarioData.senha, saltRounds);

    const newUsuario = {
        ...usuarioData,
        senha: hashedPassword,
    };

    await db.query('INSERT INTO usuario SET ?', newUsuario);

    delete newUsuario.senha;
    return newUsuario;
};

export const remove = async (idUsuario) => {
    const[result] = await db.query('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario]);
    return result.affectedRows > 0;
};