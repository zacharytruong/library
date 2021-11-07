// Global variables
const modal = document.getElementById("add-book-form");
const addBookBtn = document.getElementById("add-book");
const closeModalBtn = document.querySelector(".close");

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
let myLibrary = [
  
];

function Book () {

}

function addBookToLibrary () {

}
