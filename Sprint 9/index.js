const express = require('express');

const app = express();
const PORT = 5000;


app.use(express.json());

let blogPosts = [
    {
        id: 1,
        title: "First Post",
        content: "Hello World!"
    }
];


app.get('/posts',(req, res) => {
    res.status(200).json(blogPosts);
});


app.get('/posts/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const postFound = blogPosts.find(post => post.id === id);
    if (postFound) {
        return res.status(200).json(postFound);
    } else {
        return res.status(404).json({message: "Post not found"});
    }
});


app.post('/posts',(req, res) => {
    const { title, content } = req.body;
    let newPost = {
        id: Date.now(),
        title: title,
        content: content
    }
    blogPosts.push(newPost);
    res.status(201).json({message: "Post created successfully"});
});


app.put('/posts/:id',(req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);
    const postFound = blogPosts.find(post => post.id === id);
    if (postFound) {
        postFound.title = title;
        postFound.content = content;
        return res.status(200).json({message: "Post updated successfully"});
    } else {
        return res.status(404).json({message: "Post not found"});
    }
});


app.delete('/posts/:id',(req, res) => {
    const id = parseInt(req.params.id);
    let postFound = blogPosts.find(post => post.id === id);
    if (postFound) {
        blogPosts = blogPosts.filter(post => post.id !== id);
        return res.status(200).json({message: "Post deleted successfully"});
    } else {
        return res.status(404).json({message: "Post not found"});
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

