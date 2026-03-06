import db from '../db/db.js';

export const criarInteresse = async (dados) => {
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
   await db.execute(
      'DELETE FROM listaInteresse WHERE idInteresse = ?',
      [id]
   );
};
