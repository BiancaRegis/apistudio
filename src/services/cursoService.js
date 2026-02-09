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
        conditions.push('LOWER(nivel) LIKE ?');
        values.push(`%${nivel.toLowerCase()}%`);
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

export const create = async (cursoData) => {
    await db.query('INSERT INTO curso SET ?', cursoData);
    return cursoData;
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