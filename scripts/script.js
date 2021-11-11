// Global variables
const modal = document.getElementById("add-book-form");
const addBookBtn = document.getElementById("add-book");
const closeModalBtn = document.querySelector(".close");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const readingStatus = document.getElementById("readingStatus");
const submit = document.getElementById("submit");
const bookshelf = document.querySelector(".bookshelf");
let myLibrary = [];
let newTitle, newCover, newStatus;

// Global functions
function Book(cover, title, status){
  this.cover = cover;
  this.title = title;
  this.status = status;
}
const book1 = new Book("./resources/harrypotter-3.jpg", 
  "Harry Potter and the Prisoner of Azkaban", 
  "READ");
myLibrary.push(book1)
const book2 = new Book("./resources/harrypotter-4.jpeg", 
  "Harry Potter and the Goblet of Fire", 
  "READ");
myLibrary.push(book2)
const book3 = new Book("./resources/harrypotter-5.jpeg", 
  "Harry Potter and the Order of the Phoenix", 
  "READ");
myLibrary.push(book3)

// Create book-wrapper process
function createBookInfo(obj){
  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info")

  let h3 = document.createElement("h3");
  let bookStatus = document.createElement("button");
  let bookRemoval = document.createElement("button");
  h3.classList.add("book-title")
  bookStatus.classList.add("book-status")
  bookRemoval.classList.add("book-removal")

  bookInfo.appendChild(h3)
  bookInfo.appendChild(bookStatus)
  bookInfo.appendChild(bookRemoval)

  return bookInfo
}
function createBookDiv(){
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book")

  let bookCover = document.createElement("img");
  bookCover.classList.add("book-cover")

  bookDiv.appendChild(bookCover)

  return bookDiv
}
function createBookWrapper(){
  const bookWrapper = document.createElement("div");
  bookWrapper.classList.add("book-wrapper")

  bookWrapper.appendChild(createBookDiv())
  return bookWrapper
}
function addNewBookToBookShelf(){
  return bookshelf.appendChild(createBookWrapper())
}


// Display books from the library
function displayAllBooks(){
  for (let book of myLibrary){
    createBookInfo(book)
  }
}


function updateNewTitle(){
  return newTitle = title.value;
}
function updateNewCover(){
  return newCover = cover.value;
}
function updateNewStatus(){
  return newStatus = readingStatus.value;
}

// Add book form modal
addBookBtn.addEventListener("click", () => {
  modal.style.display = "block";
})
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
})
window.addEventListener("click", e => {
  if (e.target == modal){
    modal.style.display = "none";
  }
})

// Detects whether localStorage is both supported and available:
function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  
}
else {
  // Too bad, no localStorage for us
  
}

// Get info from adding book form
title.addEventListener("change", updateNewTitle)
cover.addEventListener("change", updateNewCover)
readingStatus.addEventListener("change", updateNewStatus)

// Submit adding book form
// submit.addEventListener("click", refreshLib)
