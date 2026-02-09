import db from '../db/db.js';

export const findAll = async (
    idMatricula,
    dataMatricula,
    situacao,
    idUsuario,
    idTurma
) => {

    let sql = 'SELECT * FROM matricula';
    const conditions = [];
    const values = [];

    if (idMatricula) {
        conditions.push('idMatricula = ?');
        values.push(idMatricula);
    }

    if (dataMatricula) {
        conditions.push('dataMatricula = ?');
        values.push(dataMatricula);
    }

    if (situacao) {
        conditions.push('LOWER(situacao) LIKE ?');
        values.push(`%${situacao.toLowerCase()}%`);
    }

    if (idUsuario) {
        conditions.push('idUsuario = ?');
        values.push(idUsuario);
    }

    if (idTurma) {
        conditions.push('idTurma = ?');
        values.push(idTurma);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (matriculaData) => {
    await db.query('INSERT INTO matricula SET ?', matriculaData);
    return matriculaData;
};

export const update = async (idMatricula, matriculaData) => {
    const [result] = await db.query(
        'UPDATE matricula SET ? WHERE idMatricula = ?',
        [matriculaData, idMatricula]
    );

    return result.affectedRows > 0;
};

export const remove = async (idMatricula) => {
    const [result] = await db.query(
        'DELETE FROM matricula WHERE idMatricula = ?',
        [idMatricula]
    );

    return result.affectedRows > 0;
};
