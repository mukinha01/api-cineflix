// Criar uma API que liste filmes e series, a API deve ter:
// - Um endpoint para listar todos os filmes
// -- nesse endpoint deve ser possível filtrar por gênero
// - Um endpoint para listar todas as series
// -- nesse endpoint deve ser possível filtrar por gênero
// - Um endpoint para criar um filme
// -- Deve validar as entradas e não permitir criar um filme se alguma propriedade não for enviada
// -- O titulo do filme precisa ser maior do que 1  caractere
// - Um endpoint para criar uma serie
// -- Deve validar as entradas e não permitir criar uma serie se alguma propriedade não foi enviada
// - Um endpoint para buscar um filme por id
// -- Deve validar se um filme não foi encontrado
// - Um endpoint para buscar uma serie por id
// -- Deve validar se uma serie não foi encontrada

// Tanto a serie quanto o filme deve ter as seguintes propriedades
// - id
// - description
// - title
// - image
// - genre
// - releaseYear



const express = require('express');
const app = express();
app.use(express.json());

let filmes = [
    {
        id: 1,
        description: 'Um filme de ação emocionante',
        title: 'Ação Total',
        image: 'https://exemplo.com/acao-total.jpg',
        genre: 'Ação',
        releaseYear: 2022,
    }];
let series = [
    {
        id: 1,
        description: 'Uma série de comédia divertida',
        title: 'Comédia Total',
        image: 'https://exemplo.com/comedia-total.jpg',
        genre: 'Comédia',
        releaseYear: 2021
    }];
let proximoIdFilme = 1;
let proximoIdSerie = 1;

// LISTAR FILMES 
app.get('/filmes', (req, res) => {
    let resultado = filmes;

    // Filtro por gênero 
    if (req.query.genéro) {
        resultado = filmes.filter(f => f.genre === req.query.genéro);
    }

    res.json(resultado);
});

//  LISTAR SÉRIES
app.get('/series', (req, res) => {
    let resultado = series;

    if (req.query.genéro) {
        resultado = series.filter(s => s.genre === req.query.genéro);
    }0 

    res.json(resultado);
});

// CRIAR FILME 
app.post('/filmes', (req, res) => {
    const { description, title, image, genre, releaseYear } = req.body;

    // Validação: todas as propriedades obrigatórias
    if (!description || !title || !image || !genre || releaseYear === undefined) {
        return res.status(400).json({ erro: 'Todas as propriedades são obrigatórias (description, title, image, genre, releaseYear)' });
    }

    // Validação específica do título
    if (typeof title !== 'string' || title.length <= 1) {
        return res.status(400).json({ erro: 'O título do filme precisa ser maior do que 1 caractere' });
    }

    // Validação extra de releaseYear
    if (typeof releaseYear !== 'number') {
        return res.status(400).json({ erro: 'releaseYear deve ser um número' });
    }

    const novoFilme = {
        id: proximoIdFilme++,
        description,
        title,
        image,
        genre,
        releaseYear
    };

    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

// CRIAR SÉRIE 
app.post('/series', (req, res) => {
    const { description, title, image, genre, releaseYear } = req.body;

    // Validação: todas as propriedades obrigatórias
    if (!description || !title || !image || !genre || releaseYear === undefined) {
        return res.status(400).json({ erro: 'Todas as propriedades são obrigatórias (description, title, image, genre, releaseYear)' });
    }

    if (typeof releaseYear !== 'number') {
        return res.status(400).json({ erro: 'releaseYear deve ser um número' });
    }

    const novaSerie = {
        id: proximoIdSerie++,
        description,
        title,
        image,
        genre,
        releaseYear
    };

    series.push(novaSerie);
    res.status(201).json(novaSerie);
});

//  BUSCAR FILME POR ID
app.get('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.json(filme);
});

// BUSCAR SÉRIE POR ID
app.get('/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const serie = series.find(s => s.id === id);

    if (!serie) {
        return res.status(404).json({ erro: 'Série não encontrada' });
    }

    res.json(serie);
});

//INICIAR SERVIDOR
app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
});