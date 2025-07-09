const axios = require('axios');

// Task 10: Get all books using async/await
async function getAllBooks() {
  try {
    const response = await axios.get('https://155bd8bc-e668-4495-9646-e2c92c2d2719-00-1hmhxwuzqeryf.pike.replit.dev/books');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
}

// Task 11: Search by ISBN using Promises
function getBookByISBN(isbn) {
  axios.get(`https://155bd8bc-e668-4495-9646-e2c92c2d2719-00-1hmhxwuzqeryf.pike.replit.dev/books/isbn/${isbn}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching book:', error.message);
    });
}

// Task 12: Search by Author using async/await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`https://155bd8bc-e668-4495-9646-e2c92c2d2719-00-1hmhxwuzqeryf.pike.replit.dev/books/author/${author}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
  }
}

// Task 13: Search by Title using async/await
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`https://155bd8bc-e668-4495-9646-e2c92c2d2719-00-1hmhxwuzqeryf.pike.replit.dev/books/title/${title}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching books by title:', error.message);
  }
}

// للتجربة، ممكن تفعل استدعاء دوال هنا:
// getAllBooks();
// getBookByISBN('1111');
// getBooksByAuthor('Paulo Coelho');
// getBooksByTitle('The Alchemist');