


// Global Varibales
let myLibrary = [];
let totalBooks = 0;
let totalBookRead = 0;
let totalBookPages = 0;
let totalBookPagesRead = 0;
let valid = true;

// HTML Elements Control
const cardsDiv = document.querySelector('.cards');
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

// Book Constructor
function Book(title, author, pagesNum, pagesRead) {
    this.title = title;
    this.author = author;
    this.pagesNum = pagesNum;
    this.pagesRead = pagesRead;
    this.info = function () {
      return '<div>' + 'Book Title: ' + '</div>' + '<div>' + title + '</div>' + '<div>' + "Book Author: " + '</div>' + '<div>' + author + '</div>' + '<div>' + "Total Book Pages: " + '</div>' + '<div>' + pagesNum + '</div>' + '<div>' + 'Pages Read: ' + '</div>' + '<div>' + pagesRead + '</div>';
    }
}

// User Submits New Book --> Fonction Submiting Book Details To Library Array
function addBookToArr() {
  checkValidInputs();  
    
  if (valid){
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
        input.value = '';
    });
    const newBook = new Book(bookTitle, bookAuthor, bookTotalPages, bookTotalRead);
    myLibrary.push(newBook);
    addBookToLibrary();
    closeForm();
  }
}

// Checking if user entered valid inputs and handels the error divs
function checkValidInputs() {
  valid = true;
  let totalPages=-1;
  let totalRead=-1;
  formInputs.forEach(input => {
    switch(input.id){
      case 'title':
        if ((input.value == '') || (!input.value)){
          valid = false;
          input.nextElementSibling.style.display = 'block';
        }
        else {
          input.nextElementSibling.style.display = 'none';
        }
        break;
      case 'author':
        if ((input.value == '') || (!input.value)){
          valid = false;
          input.nextElementSibling.style.display = 'block';
        }
        else {
          input.nextElementSibling.style.display = 'none';
        }
        break;
      case 'total-pages':
        if ((input.value == '') || (!input.value)){
          valid = false;
          input.nextElementSibling.style.display = 'block';
        }
        else {
          input.nextElementSibling.style.display = 'none';
          totalPages = input.value;
        }
        break;
      case 'total-read':
        if ((input.value == '') || (!input.value)){
          valid = false;
          input.nextElementSibling.style.display = 'block';
        }
        else {
          input.nextElementSibling.style.display = 'none';
          totalRead = input.value;
          if (totalPages != -1) { // checking to see if there is a total pages input
            if (totalRead > totalPages){
              valid = false;
              input.parentNode.children.item(2).style.display = 'block';
            }
            else {
              input.parentNode.children.item(2).style.display = 'none';
            }
          }
          else {
            input.parentNode.children.item(2).style.display = 'none';
          }
        }
        
        break;
    }
  });
}

// Displaying The Books on the Cards Div and Creating the Cards Elements
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
      // &#10005; -- X ::::: &#10003; -- V
      if (book.pagesNum == book.pagesRead){
        toggleInput.checked = true;
        toggleLabel.innerHTML = `<div class='switch-text'>Read &#10003;</div>`;
      }
      else {
        toggleInput.checked = false;
        toggleLabel.innerHTML = `<div class='switch-text'>Not Read &#10005;</div>`;
      }
      const toggleDiv = document.createElement('div');
      toggleDiv.classList.add('toggle-switch');
      toggleLabel.appendChild(toggleInput);
      toggleLabel.appendChild(toggleDiv);
      bookCard.innerHTML += book.info();
      const deleteBookBtn = document.createElement('div');
      deleteBookBtn.classList.add('delete-book');
      bookCard.appendChild(toggleLabel);
      bookCard.appendChild(deleteBookBtn);
      cardsDiv.appendChild(bookCard);
      deleteBookBtn.addEventListener('click', removeBookFromArray);
      toggleInput.addEventListener('click', changeReadState);
      bookCard.addEventListener('mouseenter', changeBarColorToBlue);
      bookCard.addEventListener('mouseleave', changeBarColorToGreen);
    });
    updateSideBarInfo();
}

// Deleting A Book From the Library
function removeBookFromArray(e){
  const currCard = e.target.parentElement;
  const currCardChildren = currCard.children;
  const currBookName = currCardChildren.item(2).textContent;
  myLibrary.forEach(book => {
    if(book.title == currBookName){
      let bookIndex = myLibrary.indexOf(book);
      myLibrary.splice(bookIndex, 1);
    }
  });
  addBookToLibrary();
}

// Changing The Read state and updates the pages read number accordingly
function changeReadState(e){
  // &#10005; -- X ::::: &#10003; -- V
  const currLable = e.target.parentElement;
  const currCard = currLable.parentElement;
  const currCardChildren = currCard.children;
  const currBookName = currCardChildren.item(2).textContent;
  if (e.target.checked){
    e.target.previousElementSibling.innerHTML = 'Read &#10003;';
    myLibrary.forEach(book => {
      if(book.title == currBookName){
        book.pagesRead = book.pagesNum;
        currCardChildren.item(8).textContent = book.pagesRead;
      }
    });
  }
  else {
    e.target.previousElementSibling.innerHTML = 'Not Read &#10005;';
    myLibrary.forEach(book => {
      if(book.title == currBookName){
        book.pagesRead = 0;
        currCardChildren.item(8).textContent = book.pagesRead;
      }
    });
  }
  updateSideBarInfo();
}

// Updates the side bar information
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
  formInputs.forEach(input => {
    input.value = '';
  });
}