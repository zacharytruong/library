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
function Book (title, cover, status) {
  this.title = title;
  this.cover = cover;
  this.status = status;
}
function clearOldInfo(){
  newTitle = "";
  newCover = "";
  newStatus = "";
  title.value = "";
  cover.value = "";
  readingStatus.value = "";
}
function addBookToLibrary () {
  updateNewTitle()
  updateNewCover()
  updateNewStatus()
  let newBook = new Book(newTitle, newCover, newStatus);
  myLibrary.push(newBook);
  modal.style.display = "none";
  return myLibrary;
}
function refreshLib(){
  addBookToLibrary()
  displayBookshelf()
  clearOldInfo()
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
  clearOldInfo()
})
window.addEventListener("click", e => {
  if (e.target == modal){
    modal.style.display = "none";
    clearOldInfo()
  }
})

// Get info from adding book form
title.addEventListener("change", updateNewTitle)
cover.addEventListener("change", updateNewCover)
readingStatus.addEventListener("change", updateNewStatus)

// Submit adding book form
submit.addEventListener("click", refreshLib)

// Display all books from the library
function displayBookshelf(){
  for (let book in myLibrary){
    // Create book-info div
    let bookInfo = document.createElement("div");
    let h3 = document.createElement("h3");
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");

    // Set title, reading status, and remove content
    h3.textContent = book.title;
    button1.textContent = book.status;
    button2.textContent = "REMOVE";

    // Set classes for those ele
    h3.classList.add("book-title")
    button1.classList.add("book-status")
    button2.classList.add("book-removal")
    bookInfo.classList.add("book-info")

    // Add those ele to bookInfo
    bookInfo.appendChild(h3)
    bookInfo.appendChild(button1)
    bookInfo.appendChild(button2)

    // Create book div
    let newBook = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", book.cover);
    img.classList.add("book-cover")
    newBook.classList.add("book")
    newBook.appendChild(img);
    newBook.appendChild(bookInfo)
    
    // Create book-wrapper
    let bookWrapper = document.createElement("div");
    bookWrapper.classList.add("book-wrapper");
    bookWrapper.appendChild(newBook)

    // Append book-wrapper div to bookshelf div
    bookshelf.appendChild(bookWrapper)
  }
}
window.onload = displayBookshelf;


