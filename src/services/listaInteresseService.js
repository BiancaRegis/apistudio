import db from '../db/db.js';

export const criarInteresse = async (dados) => {

   // 🔹 verifica duplicidade
   const [existe] = await db.execute(
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

   const [result] = await db.execute(sql, [
      dados.dataInteresse,
      dados.situacao,
      dados.idUsuario,
      dados.idCurso
   ]);

   return result;
};

export const buscarPorUsuario = async (idUsuario) => {
   const [rows] = await db.execute(
      'SELECT * FROM listaInteresse WHERE idUsuario = ?',
      [idUsuario]
   );
   return rows;
};

export const buscarPorCurso = async (idCurso) => {
   const [rows] = await db.execute(
      'SELECT * FROM listaInteresse WHERE idCurso = ?',
      [idCurso]
   );
   return rows;
};

export const deletarInteresse = async (id) => {
   const [result] = await db.execute(
      'DELETE FROM listaInteresse WHERE idInteresse = ?',
      [id]
   );

   return result.affectedRows > 0;
};