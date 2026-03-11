const booksContainer = document.getElementById("books");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const formAddBook = document.getElementById("formAddBook");

let allBooks = [];
let currentDisplayCount = 0;
const DISPLAY_CHUNK = 12;

// Load all books from backend
function loadBooks() {
  fetch("http://localhost:5000/api/books")
    .then(res => res.json())
    .then(data => { allBooks = data; displayBooks(allBooks, true); });
}

// Display books with + More pseudo-card
function displayBooks(books, reset = true) {
  if (reset) currentDisplayCount = 0;
  booksContainer.innerHTML = "";

  const toDisplay = books.slice(0, currentDisplayCount + DISPLAY_CHUNK);
  currentDisplayCount += DISPLAY_CHUNK;

  toDisplay.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `
      <img src="images/${book.image}" style="width:100%;height:250px;object-fit:cover;">
      <div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>
      <div class="book-category">${book.category}</div>
    `;
    card.addEventListener("click", () => openModal(book));
    booksContainer.appendChild(card);
  });

  if(currentDisplayCount < books.length) {
    const moreCard = document.createElement("div");
    moreCard.classList.add("book-card", "more-card");
    moreCard.innerHTML = `+ ${books.length - currentDisplayCount} more`;
    moreCard.addEventListener("click", () => displayBooks(books, false));
    booksContainer.appendChild(moreCard);
  }
}

// Filter functions
function filterBooks() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchText) ||
                          book.author.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  displayBooks(filtered, true);
}

function filterByCategory(category) {
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.remove('active');
    if(card.textContent === category) card.classList.add('active');
  });

  if(category === 'All') displayBooks(allBooks, true);
  else displayBooks(allBooks.filter(book => book.category === category), true);
}

// Modal functions
function openModal(book){
  const modal = document.getElementById("bookModal");
  modal.style.display = "flex";
  document.getElementById("modalImage").src = `images/${book.image}`;
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = "Author: " + book.author;
  document.getElementById("modalCategory").textContent = "Category: " + book.category;
}
function closeModal(){ document.getElementById("bookModal").style.display = "none"; }

// Add Book Form
formAddBook.addEventListener("submit", function(e){
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("newCategory").value;
  const image = document.getElementById("image").value;

  fetch("http://localhost:5000/api/books", {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({title, author, category, image})
  })
  .then(res => res.json())
  .then(data => {
    alert("Book added successfully!");
    formAddBook.reset();
    loadBooks();
  });
});

// Event listeners
searchInput.addEventListener("input", filterBooks);
categorySelect.addEventListener("change", filterBooks);

// Navbar active state
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Initial load
loadBooks();