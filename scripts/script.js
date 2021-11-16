// Global variables
const modal = document.getElementById("add-book-form");
const addBookBtn = document.getElementById("add-book");
const closeModalBtn = document.querySelector(".close");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const readingStatus = document.getElementById("readingStatus");
const submit = document.getElementById("submit");
const bookshelf = document.querySelector(".bookshelf");
let myLibrary = [
  {
      "cover": "./resources/harrypotter-1.jpeg",
      "title": "Harry Potter and the Sorceres's Stone",
      "status": "READ"
  },
  {
      "cover": "./resources/harrypotter-2.jpeg",
      "title": "Harry Potter and the Chamber of Secretse",
      "status": "READ"
  },
  {
      "cover": "./resources/harrypotter-3.jpg",
      "title": "Harry Potter and the Prisoner of Azkaban",
      "status": "READ"
  },
  {
      "cover": "./resources/harrypotter-4.jpeg",
      "title": "Harry Potter and the Goblet of Fire",
      "status": "READ"
  },
  {
      "cover": "./resources/harrypotter-5.jpeg",
      "title": "Harry Potter and the Order of the Phoenix",
      "status": "READ"
  },
  {
      "cover": "./resources/harrypotter-1.jpeg",
      "title": "Harry Potter and the Sorceres's Stone",
      "status": "READ"
  }
];
let newTitle, newCover;

// Load myLibrary from storage if possible
checkLocalStorage();

// Global functions
function Book(cover, title, status){
  this.cover = cover;
  this.title = title;
  this.status = status;
}
function addNewBookToLibrary(cover, title, status){
  const book = new Book(cover, title, status);
  myLibrary.push(book)
}
function updateNewTitle(){
  return newTitle = title.value;
}
function updateNewCover(){
  return newCover = cover.value;
}
function updateNewStatus(){
  return readingStatus.value;
}
function submitBook(){
  const newBook = new Book(newCover, newTitle, readingStatus.value.toUpperCase());
  myLibrary.push(newBook)
  addNewBookToBookShelf(myLibrary[myLibrary.length - 1])
  clearForm()
  modal.style.display = "none";
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
  location.reload()
}
function clearForm(){
  newTitle = "";
  newCover = "";
  readingStatus.value = "READ";
}
function removeAllBooks(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild)
  }
}

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

function checkLocalStorage(){
    if (storageAvailable('localStorage')) {
      // Yippee! We can use localStorage awesomeness
      if (!localStorage.getItem("myLibrary")){
           localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
           displayAllBooks(myLibrary)
           return myLibrary;
      } else {
        let savedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary = savedLibrary;
        displayAllBooks(myLibrary)
        return myLibrary;
      }
    }
    else {
      // Too bad, no localStorage for us
     displayAllBooks(myLibrary);
     return myLibrary;
    }
}

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

  h3.textContent = obj.title;
  bookStatus.textContent = obj.status;
  bookRemoval.textContent = "REMOVE";

  bookInfo.appendChild(h3)
  bookInfo.appendChild(bookStatus)
  bookInfo.appendChild(bookRemoval)

  return bookInfo
}
function createBookDiv(obj){
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book")

  let bookCover = document.createElement("img");
  bookCover.classList.add("book-cover")
  bookCover.setAttribute("src", obj.cover)

  bookDiv.appendChild(bookCover)
  bookDiv.appendChild(createBookInfo(obj))

  return bookDiv
}
function createBookWrapper(obj){
  const bookWrapper = document.createElement("div");
  bookWrapper.classList.add("book-wrapper")

  bookWrapper.appendChild(createBookDiv(obj))
  return bookWrapper
}
function addNewBookToBookShelf(obj){
  return bookshelf.appendChild(createBookWrapper(obj))
}

// Display books from the library
function displayAllBooks(bookArray){
  for (let book of bookArray){
    addNewBookToBookShelf(book)
  }
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

// Get info from adding book form
title.addEventListener("change", updateNewTitle)
cover.addEventListener("change", updateNewCover)
readingStatus.addEventListener("change", updateNewStatus)

// Submit adding book form
submit.addEventListener("click", submitBook)

// Reading status button
const bookStatusBtns = Array.from(document.getElementsByClassName("book-status"));
for (let i = 0; i < bookStatusBtns.length; i++){
  bookStatusBtns[i].addEventListener("click", changeStatus)
  function changeStatus(){
    if (myLibrary[i].status == "READ"){
      myLibrary[i].status = "UNREAD";
      this.textContent = "UNREAD";
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    } else if (myLibrary[i].status == "UNREAD"){
      myLibrary[i].status = "READ";
      this.textContent = "READ";
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    }
  }
}

// Romove button
const removeBtns = Array.from(document.getElementsByClassName("book-removal"));
for (let i = 0; i < bookStatusBtns.length; i++){
  removeBtns[i].addEventListener("click", removeBook)
  function removeBook(){
    myLibrary.splice(i, 1)
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    removeAllBooks(bookshelf)
    displayAllBooks(myLibrary)
    location.reload()
  }
}
