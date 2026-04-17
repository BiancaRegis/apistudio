import * as service from '../services/listaInteresseService.js';
import Joi from 'joi';

export const listaSchema = Joi.object({
   dataInteresse: Joi.date().iso().required(),
   situacao: Joi.string().min(3).required(),
   idUsuario: Joi.number().required(),
   idCurso: Joi.number().required()
});

export const criarLista = async (req, res) => {
   try {
      const result = await service.criarInteresse(req.body);
      res.status(201).json(result);
   } catch (err) {

      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
         return res.status(400).json({
            erro: 'usuário ou curso inválido.'
         });
      }

      console.error('erro ao criar interesse:', err);
      res.status(500).json({ erro: 'erro interno' });
   }
};

export const porUsuario = async (req, res) => {
   try {
      const dados = await service.buscarPorUsuario(req.params.idUsuario);
      res.json(dados);
   } catch (err) {
      res.status(500).json({ erro: err.message });
   }
};

export const porCurso = async (req, res) => {
   try {
      const dados = await service.buscarPorCurso(req.params.idCurso);
      res.json(dados);
   } catch (err) {
      res.status(500).json({ erro: err.message });
   }
};

export const remover = async (req, res) => {
   try {
      await service.deletarInteresse(req.params.id);
      res.json({ mensagem: "Interesse removido" });
   } catch (err) {
      res.status(500).json({ erro: err.message });
   }
};