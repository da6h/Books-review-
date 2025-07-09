const express = require('express');
const axios = require('axios'); // استيراد axios مرة واحدة في الأعلى
const app = express();
const PORT = process.env.PORT || 5000; // دعم بيئة Replit لبورت ديناميكي

app.use(express.json());

// Dummy books data
let books = [
  { isbn: "1111", title: "The Alchemist", author: "Paulo Coelho", reviews: {} },
  { isbn: "2222", title: "The Prophet", author: "Kahlil Gibran", reviews: {} },
  { isbn: "3333", title: "1984", author: "George Orwell", reviews: {} }
];

// Dummy users data
let users = [];

// Task 1: Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2: Get book by ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) res.json(book);
  else res.status(404).json({ message: 'Book not found' });
});

// Task 3: Get books by author
app.get('/books/author/:author', (req, res) => {
  const authorBooks = books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  if (authorBooks.length > 0) res.json(authorBooks);
  else res.status(404).json({ message: 'No books by this author' });
});

// Task 4: Get books by title
app.get('/books/title/:title', (req, res) => {
  const titleBooks = books.filter(b => b.title.toLowerCase() === req.params.title.toLowerCase());
  if (titleBooks.length > 0) res.json(titleBooks);
  else res.status(404).json({ message: 'No books with this title' });
});

// Task 5: Get book reviews
app.get('/books/review/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) res.json(book.reviews);
  else res.status(404).json({ message: 'Book not found' });
});

// Task 6: Register user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  if (users.find(u => u.username === username)) return res.status(400).json({ message: 'User already exists' });
  users.push({ username, password });
  res.json({ message: 'User registered successfully' });
});

// Task 7: Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ message: 'Login successful' });
  else res.status(401).json({ message: 'Invalid username or password' });
});

// Task 8: Add/Modify review
app.put('/books/review/:isbn', (req, res) => {
  const { username, review } = req.body;
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.reviews[username] = review;
  res.json({ message: 'Review added/modified successfully', reviews: book.reviews });
});

// Task 9: Delete review
app.delete('/books/review/:isbn/:username', (req, res) => {
  const { isbn, username } = req.params;
  const book = books.find(b => b.isbn === isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  delete book.reviews[username];
  res.json({ message: 'Review deleted successfully', reviews: book.reviews });
});

// بدء تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});