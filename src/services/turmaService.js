import db from '../db/db.js';

export const findAll = async (
    idTurma,
    dataInicio,
    dataFinal,
    horario,
    vagas,
    preco,
    situacao,
    idCurso
) => {
    let sql = 'SELECT * FROM turma';
    const conditions = [];
    const values = [];

    if (idTurma) {
        conditions.push('idTurma = ?');
        values.push(idTurma);
    }

    if (dataInicio) {
        conditions.push('dataInicio = ?');
        values.push(dataInicio);
    }

    if (dataFinal) {
        conditions.push('dataFinal = ?');
        values.push(dataFinal);
    }

    if (horario) {
        conditions.push('horario = ?'); 
        values.push(horario);
    }

    if (vagas) {
        conditions.push('vagas = ?');
        values.push(vagas);
    }

    if (preco) {
        conditions.push('preco = ?');
        values.push(preco);
    }

    if (situacao) {
        conditions.push('LOWER(situacao) LIKE ?'); // texto
        values.push(`%${situacao.toLowerCase()}%`);
    }

    if (idCurso) {
        conditions.push('idCurso = ?');
        values.push(idCurso);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};


export const create = async (turmaData) => {
    const [result] = await db.query(
        'INSERT INTO turma SET ?',
        turmaData
    );

    return {
        idTurma: result.insertId,
        ...turmaData
    };
};


export const update = async (idTurma, turmaData) => {
    const [result] = await db.query(
        'UPDATE turma SET ? WHERE idTurma = ?',
        [turmaData, idTurma]
    );

    return result.affectedRows > 0;
};

export const remove = async (idTurma) => {
    const [result] = await db.query(
        'DELETE FROM turma WHERE idTurma = ?',
        [idTurma]
    );

    return result.affectedRows > 0;
};
