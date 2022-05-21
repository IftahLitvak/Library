

let myLibrary = [];

function Book(title, author, pagesNum, pagesRead){
    this.title = title;
    this.author = author;
    this.pagesNum = pagesNum;
    this.pagesRead = pagesRead;
    this.info = function () {
      return 'Book Title: ' + title + '\n' + "Book Author: " + author + "\n" + "Total Book Pages" + pagesNum +
       "\n" + 'Pages Read: ' + pagesRead;
    }
  }