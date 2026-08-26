const express = require('express');

const app = express();
const PORT = 5000;


app.use(express.json());

app.get('/posts',(req, res) => {
    res.json({ message: 'Route Active'});
});

app.get('/posts/:id',(req, res) => {
    res.json({ message: 'Route Active'});
});

app.post('/posts',(req, res) => {
    res.json({ message: 'Route Active'});
});

app.put('/posts/:id',(req, res) => {
    res.json({ message: 'Route Active'});
});

app.delete('/posts/:id',(req, res) => {
    res.json({ message: 'Route Active'});
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

