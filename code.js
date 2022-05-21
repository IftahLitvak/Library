


const news = new Book('harr', 'fff', 43, 3);

let myLibrary = [news];
let totalBooks = 0;
let totalBookRead = 0;
let totalBookPages = 0;
let totalBookPagesRead = 0;
const cardsDiv = document.querySelector('.cards');
addBookToLibrary();


const addBookBtn = document.querySelector('.add-book');
const closeFormBtn = document.querySelector('.close-form');
const submitFormBtn = document.querySelector('.submit-form');
const form = document.querySelector('.form-container');
const formInputs = document.querySelectorAll('input');
const items = document.querySelectorAll('.card');
items.forEach(item => item.addEventListener('mouseenter', changeBarColorToBlue));
items.forEach(item => item.addEventListener('mouseleave', changeBarColorToGreen));
addBookBtn.addEventListener('click', openForm);
closeFormBtn.addEventListener('click', closeForm);
submitFormBtn.addEventListener('click', addBookToArr);
function Book(title, author, pagesNum, pagesRead){
    this.title = title;
    this.author = author;
    this.pagesNum = pagesNum;
    this.pagesRead = pagesRead;
    this.info = function () {
      return '<div>' + 'Book Title: ' + '</div>' + '<div>' + title + '</div>' + '<div>' + "Book Author: " + '</div>' + '<div>' + author + '</div>' + '<div>' + "Total Book Pages: " + '</div>' + '<div>' + pagesNum + '</div>' + '<div>' + 'Pages Read: ' + '</div>' + '<div>' + pagesRead + '</div>';
    }
  }

function addBookToArr(){
  
    let bookTitle, bookAuthor, bookTotalPages, bookTotalRead;
    formInputs.forEach(input => {
      switch(input.id){
        case 'title':
          bookTitle = input.value;
          break;
        case 'author':
          bookAuthor = input.value;
          break;
        case 'total-pages':
          bookTotalPages = input.value;
          break;
        case 'total-read':
          bookTotalRead = input.value;
          break;
      }
    });
    const newBook = new Book(bookTitle, bookAuthor, bookTotalPages, bookTotalRead);
    myLibrary.push(newBook);
    addBookToLibrary();
    closeForm();
}

  function addBookToLibrary() {
    cardsDiv.innerHTML = '';
    myLibrary.forEach(book => {
      const cardBar = document.createElement('div');
      cardBar.classList.add('card-bar');
      cardBar.classList.add('not-over');
      const bookCard = document.createElement('div');
      bookCard.appendChild(cardBar);
      bookCard.classList.add('card');
      const toggleLabel = document.createElement('label');
      toggleLabel.classList.add('toggle');
      const toggleInput = document.createElement('input');
      toggleInput.classList.add('toggle-checkbox');
      toggleInput.type = 'checkbox';
      const toggleDiv = document.createElement('div');
      toggleDiv.classList.add('toggle-switch');
      toggleLabel.appendChild(toggleInput);
      toggleLabel.appendChild(toggleDiv);
      bookCard.innerHTML += book.info();
      bookCard.appendChild(toggleLabel);
      cardsDiv.appendChild(bookCard);
      bookCard.addEventListener('mouseenter', changeBarColorToBlue);
      bookCard.addEventListener('mouseleave', changeBarColorToGreen);
    });
    updateSideBarInfo();
  }

function updateSideBarInfo(){
  totalBookPages = 0;
  totalBookPagesRead = 0;
  totalBookRead = 0;
  totalBooks = 0;
  myLibrary.forEach(book => {
    totalBooks ++;
    if (book.pagesNum == book.pagesRead){
      totalBookRead ++;
    }
    totalBookPages += parseInt(book.pagesNum);
    totalBookPagesRead += parseInt(book.pagesRead);
  });
  document.getElementById('total-books').textContent = totalBooks;
  document.getElementById('total-books-read').textContent = totalBookRead;
  document.getElementById('total-books-pages').textContent = totalBookPages;
  document.getElementById('total-books-pages-read').textContent = totalBookPagesRead;
}



function changeBarColorToBlue(e){
    e.target.firstElementChild.classList.add('over');
    e.target.firstElementChild.classList.remove('not-over');
}

function changeBarColorToGreen(e){
    e.target.firstElementChild.classList.add('not-over');
    e.target.firstElementChild.classList.remove('over');
}


function openForm(){
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}