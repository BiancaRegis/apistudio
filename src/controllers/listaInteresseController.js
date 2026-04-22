import * as service from '../services/listaInteresseService.js';
import Joi from 'joi';

export const listaSchema = Joi.object({
   dataInteresse: Joi.date().iso().required(),
   situacao: Joi.string().min(3).valid('pendente', 'notificado', 'cancelado').required(),
   idUsuario: Joi.number().required(),
   idCurso: Joi.number().required()
});

export const listaUpdate = Joi.object({
   dataInteresse: Joi.date().iso(),
   situacao: Joi.string().min(3).valid('pendente', 'notificado', 'cancelado'),
   idUsuario: Joi.number(),
   idCurso: Joi.number()
}).min(1);


export const criarLista = async (req, res) => {
   try {
      const result = await service.criarInteresse(req.body);
      return res.status(201).json(result);

   } catch (err) {

      if (err.code === 'INTERESSE_DUPLICADO') {
         return res.status(400).json({
            erro: 'usuário já demonstrou interesse neste curso.'
         });
      }

      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
         return res.status(400).json({
            erro: 'usuário ou curso inválido.'
         });
      }

      console.error(err);
      return res.status(500).json({ erro: 'erro interno' });
   }
};

export const atualizarLista = async (req, res) => {
   try {

      // proteção extra
      if (Object.keys(req.body).length === 0) {
         return res.status(400).json({
            erro: 'nenhum dado enviado para atualização'
         });
      }

      const atualizado = await service.atualizarInteresse(req.params.id, req.body);

      if (!atualizado) {
         return res.status(404).json({ erro: 'interesse não encontrado' });
      }

      return res.json({ mensagem: 'interesse atualizado com sucesso' });

   } catch (err) {

      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
         return res.status(400).json({
            erro: 'curso inválido'
         });
      }

      if (err.code === 'EMPTY_UPDATE') {
         return res.status(400).json({
            erro: 'nenhum dado para atualizar'
         });
      }

      console.error(err);
      return res.status(500).json({ erro: 'erro interno' });
   }
};

export const porUsuario = async (req, res) => {
   try {
      const dados = await service.buscarPorUsuario(req.params.idUsuario);

      if (dados.length === 0) {
         return res.status(404).json({
            message: "nenhuma lista de interesse encontrada"
         });
      }

      return res.status(200).json(dados);

   } catch (err) {
      console.log(err);
      return res.status(500).json({ erro: 'erro interno' });
   }
};
export const porCurso = async (req, res) => {
   try {
      const dados = await service.buscarPorCurso(req.params.idCurso);

      if (dados.length === 0) {
         return res.status(404).json({
            message: "nenhuma lista de interesse encontrada"
         });
      }

      return res.status(200).json(dados);

   } catch (err) {
      console.log(err);
      return res.status(500).json({ erro: err.message });
   }
};

export const listarTodos = async (req, res) => {
   try {
      const dados = await service.buscarTodos();

      if (dados.length === 0) {
         return res.status(404).json({
            mensagem: 'nenhuma lista encontrada'
         });
      }

      res.json(dados);

   } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'erro interno' });
   }
};

export const remover = async (req, res) => {
   try {

      const removido = await service.deletarInteresse(req.params.id);

      if (!removido) {
         return res.status(404).json({
            erro: 'interesse não encontrado'
         });
      }

      return res.json({ mensagem: "Interesse removido" });

   } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: 'erro interno' });
   }
};