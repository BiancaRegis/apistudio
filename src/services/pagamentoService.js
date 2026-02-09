import db from '../db/db.js';

export const findAll = async (
    idPagamento,
    dataPagamento,
    valorPago,
    metodo,
    situacao,
    idMatricula
) => {

    let sql = 'SELECT * FROM pagamento';
    const conditions = [];
    const values = [];

    if (idPagamento) {
        conditions.push('idPagamento = ?');
        values.push(idPagamento);
    }

    if (dataPagamento) {
        conditions.push('dataPagamento = ?');
        values.push(dataPagamento);
    }

    if (valorPago) {
        conditions.push('valorPago = ?');
        values.push(valorPago);
    }

    if (metodo) {
        conditions.push('LOWER(metodo) LIKE ?');
        values.push(`%${metodo.toLowerCase()}%`);
    }

    if (situacao) {
        conditions.push('LOWER(situacao) LIKE ?');
        values.push(`%${situacao.toLowerCase()}%`);
    }

    if (idMatricula) {
        conditions.push('idMatricula = ?');
        values.push(idMatricula);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (pagamentoData) => {
    await db.query('INSERT INTO pagamento SET ?', pagamentoData);
    return pagamentoData;
};

export const update = async (idPagamento, pagamentoData) => {
    const [result] = await db.query(
        'UPDATE pagamento SET ? WHERE idPagamento = ?',
        [pagamentoData, idPagamento]
    );

    return result.affectedRows > 0;
};

export const remove = async (idPagamento) => {
    const [result] = await db.query(
        'DELETE FROM pagamento WHERE idPagamento = ?',
        [idPagamento]
    );

    return result.affectedRows > 0;
};
