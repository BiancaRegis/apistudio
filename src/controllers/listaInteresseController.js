import * as service from '../services/listaInteresseService.js';

export const criarLista = async (req, res) => {
   try {
      const result = await service.criarInteresse(req.body);
      res.status(201).json(result);
   } catch (err) {
      res.status(500).json({ erro: err.message });
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