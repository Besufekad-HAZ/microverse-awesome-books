class AwesomeBooks {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  showBooks() {
    let booksHTML = '';
    this.books.forEach((book) => {
      booksHTML += `
        <div class='book'>
          <p>
            <span>"${book.title}"</span>
            by
            <span>${book.author}</span>
          </p>
          <button onClick='awesomeBooks.removeBook(${book.id})'>Remove</button>
        </div>
      `;
    });
    const booksContainer = document.querySelector('#books_container');
    booksContainer.innerHTML = booksHTML;
  }

  addBook(title, author) {
    const id = Math.round(Math.random() * 10000);
    this.books = [...this.books, { id, title, author }];
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
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
    if (bookTitle.trim() !== '' && bookAuthor.trim() !== '') {
      awesomeBooks.addBook(bookTitle, bookAuthor);
      addBookForm.reset();
    }
  });

window.location.href = '#books_container';
