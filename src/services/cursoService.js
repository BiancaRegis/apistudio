import db from '../db/db.js';

export const findAll = async (idCurso, titulo, cargaHoraria, nivel, situacao) => {
    let sql = 'SELECT * FROM curso';
    const conditions = [];
    const values = [];

    if (idCurso) {
        conditions.push('idCurso = ?');
        values.push(idCurso);
    }

    if (titulo) {
        conditions.push('titulo = ?');
        values.push(titulo);
    }

    if (cargaHoraria) {
        conditions.push('cargaHoraria = ?');
        values.push(cargaHoraria);
    }

    if (nivel) {
        conditions.push('nivel = ?');
        values.push(nivel);
    }
    if (situacao) {
        conditions.push('LOWER(situacao) LIKE ?');
        values.push(`%${situacao.toLowerCase()}%`);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};

export const findById = async (idCurso) => {
    const sql = 'SELECT * FROM curso WHERE idCurso = ?';
    const [rows] = await db.query(sql, [idCurso]);

    return rows[0];
};

export const create = async (cursoData) => {
    const [result] = await db.query('INSERT INTO curso SET ?', cursoData);

    return {
        idCurso: result.insertId,
        ...cursoData
    };
};

export const update = async (idCurso, cursoData) => {
    const [result] = await db.query(
        'UPDATE curso SET ? WHERE idCurso = ?',
        [cursoData, idCurso]
    );
    return result.affectedRows > 0;
};

export const remove = async (idCurso) => {
    const [result] = await db.query(
        'DELETE FROM curso WHERE idCurso = ?',
        [idCurso]
    );
    return result.affectedRows > 0;
};