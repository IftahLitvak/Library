

function Book(title, author, pagesNum, read){
    this.title = title;
    this.author = author;
    this.pagesNum = pagesNum;
    this.read = read;
    this.info = function () {
      let readStr = '';
      if (read){
        readStr = 'already read';
      }
      else {
        readStr = 'not read yet';
      }
      return title + " by " + author + ", " + pagesNum + ", " + readStr;
    }
    console.log(this.info());
  }