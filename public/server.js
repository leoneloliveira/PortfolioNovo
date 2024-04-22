const express = require('express');
const fetch = require('node-fetch');
const path = require('path'); // Importe o módulo path
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3001;

// Servir arquivos estáticos do diretório 'public'

// Configurando o diretório raiz para o Express
app.use(express.static(__dirname));



// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do transporte de email
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'leonelmarques08hotmail.com@gmail.com', // Insira seu email do Gmail aqui
        pass: 'uhvz xdkv ntko yvpz' // Insira sua senha do Gmail aqui
    }
});

// Rota para lidar com o envio de mensagens
app.post('/enviar-mensagem', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const assunto = req.body.assunto;
    const mensagem = req.body.mensagem;

    // Validar entrada do usuário
    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    // Configurações do email
    const mailOptions = {
        from: email,
        to: 'leonelmarques08hotmail.com@gmail.com', // Insira seu email do Gmail aqui
        subject: assunto,
        text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem: ${mensagem}`
    };

 

  
   // Enviar email
   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        res.status(500).send('Erro ao enviar a mensagem. Por favor, tente novamente.');
    } else {
        console.log('Mensagem enviada: ' + info.response);
        res.send('Mensagem enviada com sucesso!');
    }
});


});





app.get('/api/github-repos', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/leoneloliveira/repos');
    const repos = await response.json();
    res.json(repos);
  } catch (error) {
    console.error('Erro ao obter os repositórios do GitHub:', error);
    res.status(500).json({ error: 'Erro ao obter os repositórios do GitHub' });
  }
});

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
