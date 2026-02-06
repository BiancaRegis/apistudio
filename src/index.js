import express from 'express'
console.log('olá');

const app = express();

app.use(express.json());

app.post('/clientes', (req, res) => {
    const novoCliente = req.body;

    console.log("Recebemos um novo cliente:", novoCliente);

    res.json({ message: `Cliente ${novoCliente.nome} cadastrado com sucesso!`, data: novoCliente});
});

const PORTA = 3333;

app.get('/', (request, response) => {
    response.json({message: "Bem-vindo à API Studio Wakanda in Aracoara!"});
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}. Acesse https://localhost:${PORTA}`);
});

const listaDeClientes = [
    {id: 1, nome: "João Silva", email: "joao@gmail.com"},
    {id: 2, nome: "Bianca Regis", email: "bibi@gmail.com"}
];

app.get('/clientes', (req,res) => {
    res.json(listaDeClientes);
});

app.get('/clientes/:id', (req,res) => {
    const idDoCliente = parseInt(req.params.id);

    const cliente = listaDeClientes.find(c => c.id === idDoCliente);

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ mensagem: "Cliente não encontrado."});
    }
});