import db from '../db/db.js';

export const criarInteresse = async (dados) => {

   const [existe] = await db.query(
      'SELECT * FROM listaInteresse WHERE idUsuario = ? AND idCurso = ?',
      [dados.idUsuario, dados.idCurso]
   );

   if (existe.length > 0) {
      throw { code: 'INTERESSE_DUPLICADO' };
   }

   const sql = `
      INSERT INTO listaInteresse
      (dataInteresse, situacao, idUsuario, idCurso)
      VALUES (?, ?, ?, ?)
   `;

   const [result] = await db.query(sql, [
      dados.dataInteresse,
      dados.situacao,
      dados.idUsuario,
      dados.idCurso
   ]);

   return {
      idInteresse: result.insertId,
      dataInteresse: dados.dataInteresse,
      situacao: dados.situacao,
      idUsuario: dados.idUsuario,
      idCurso: dados.idCurso
   };
};

export const atualizarInteresse = async (id, dados) => {

   // evita SQL inválido (SET vazio)
   if (Object.keys(dados).length === 0) {
      throw { code: 'EMPTY_UPDATE' };
   }

   const [result] = await db.query(
      'UPDATE listaInteresse SET ? WHERE idInteresse = ?',
      [dados, id]
   );

   return result.affectedRows > 0;
};

export const buscarPorUsuario = async (idUsuario) => {
   const [rows] = await db.query(
      'SELECT * FROM listaInteresse WHERE idUsuario = ?',
      [idUsuario]
   );
   return rows;
};

export const buscarPorCurso = async (idCurso) => {
   const [rows] = await db.query(
      'SELECT * FROM listaInteresse WHERE idCurso = ?',
      [idCurso]
   );
   return rows;
};

export const buscarTodos = async () => {
   const [rows] = await db.query(
      'SELECT * FROM listaInteresse'
   );
   return rows;
};

export const deletarInteresse = async (id) => {
   const [result] = await db.query(
      'DELETE FROM listaInteresse WHERE idInteresse = ?',
      [id]
   );

   return result.affectedRows > 0;
};