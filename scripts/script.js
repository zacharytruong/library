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
  }
})

// Get info from adding book form
title.addEventListener("change", updateNewTitle)
cover.addEventListener("change", updateNewCover)
readingStatus.addEventListener("change", updateNewStatus)

// Submit adding book form
// submit.addEventListener("click", refreshLib)
