// CARREGA VARIÁVEIS DE AMBIENTE
import 'dotenv/config';

// DEPENDÊNCIAS
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ROTAS
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import turmaRoutes from './routes/turmaRoutes.js';
import matriculaRoutes from './routes/matriculaRoutes.js';
import pagamentoRoutes from './routes/pagamentoRoutes.js';
import listaEsperaRoutes from './routes/listaEsperaRoutes.js';

//////CONFIGURAÇÕES DE CAMINHO
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/////CORS
const corsOptions = {
    origin: ['http://localhost:3333'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true
};


////INICIALIZAÇÃO
const app = express();

//// MIDDLEWARES
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//// ROTA RAIZ
app.get('/', (req, res) => {
    res.json({
        message: 'API Studio Wakanda funcionando'
    });
});

////PREFIXO API
const apiPrefix = '/api';

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/usuarios`, usuarioRoutes);
app.use(`${apiPrefix}/cursos`, cursoRoutes);
app.use(`${apiPrefix}/turmas`, turmaRoutes);
app.use(`${apiPrefix}/matriculas`, matriculaRoutes);
app.use(`${apiPrefix}/pagamentos`, pagamentoRoutes);
app.use(`${apiPrefix}/lista-espera`, listaEsperaRoutes);


// ERRO GLOBAL
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'algo deu errado no servidor'
    });
});


// SERVIDOR
const PORTA = process.env.PORT || 3333;

app.listen(PORTA, () => {
    console.log(`Studio Wakanda rodando na porta ${PORTA}`);
});
