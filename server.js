const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory books array
let books = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET - All Books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// POST - Add Book
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT - Update Book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;

    res.json(book);
});

// DELETE - Remove Book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    books = books.filter(b => b.id !== id);

    res.json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

