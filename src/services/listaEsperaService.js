import db from '../db/db.js';

export const findAll = async (
    idLista,
    dataSolicitacao,
    situacao,
    idUsuario,
    idTurma
) => {

    let sql = 'SELECT * FROM listaEspera';
    const conditions = [];
    const values = [];

    if (idLista) {
        conditions.push('idLista = ?');
        values.push(idLista);
    }

    if (dataSolicitacao) {
        conditions.push('dataSolicitacao = ?');
        values.push(dataSolicitacao);
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

export const create = async (listaData) => {
    await db.query('INSERT INTO listaEspera SET ?', listaData);
    return listaData;
};

export const update = async (idLista, listaData) => {
    const [result] = await db.query(
        'UPDATE listaEspera SET ? WHERE idLista = ?',
        [listaData, idLista]
    );

    return result.affectedRows > 0;
};

export const remove = async (idLista) => {
    const [result] = await db.query(
        'DELETE FROM listaEspera WHERE idLista = ?',
        [idLista]
    );

    return result.affectedRows > 0;
};
