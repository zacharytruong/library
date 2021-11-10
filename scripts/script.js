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
  console.log("No storage")
}

// Get info from adding book form
title.addEventListener("change", updateNewTitle)
cover.addEventListener("change", updateNewCover)
readingStatus.addEventListener("change", updateNewStatus)

// Submit adding book form
// submit.addEventListener("click", refreshLib)
