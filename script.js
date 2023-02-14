
class AwesomeBooks {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  showBooks() {
    let booksHTML = '';
    this.books.forEach((book) => {
      booksHTML += `
        <div class='book'>
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <button onClick='awesomeBooks.removeBook(${book.id})'>Remove</button>
        </div>
      `;
    });
    const booksContainer = document.querySelector('#books_container');
    booksContainer.innerHTML = booksHTML;
  }

  addBook(title, author) {
    const id = Math.round(Math.random() * 10000);
    this.books.push({ id, title, author });
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(bookId) {
    const bookIndex = this.books.findIndex((book) => book && book.id === bookId);
    this.books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }
}

const awesomeBooks = new AwesomeBooks();
awesomeBooks.showBooks();

document
  .querySelector('#add_new_book_btn')
  .addEventListener('click', (event) => {
    event.preventDefault();
    const addBookForm = document.forms.add_book_form;
    const bookTitle = addBookForm.elements.bookTitleInput.value;
    const bookAuthor = addBookForm.elements.bookAuthorInput.value;
    awesomeBooks.addBook(bookTitle, bookAuthor);
    addBookForm.reset();
  });
