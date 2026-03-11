# Online Library Catalog

## Description
A web-based library catalog built with **HTML, CSS, JavaScript (frontend)** and **Node.js, Express.js, MySQL (backend)**. Users can browse books by category, search for titles, and view book details including cover image, title, author, and category.  

The project demonstrates core concepts: **Node.js backend, MySQL tables, and forms** for adding books.

---

## Features
- Responsive book grid with hover effects
- Search books by title
- Filter books by category
- Book detail modal showing title, author, category, and cover image
- Add new books via backend form
- "+ More" feature to dynamically load additional books
- Well-organized folder structure

Optional future improvements:
- Read/Download PDF feature
- Update/Delete book functionality
- Book descriptions
- Hero section animations and header images
- Footer with social media links

---

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL

---

## How to Run Locally
1. Clone the repository:
command - git clone https://github.com/<your-username>/online-library-catalog.git
2.Navigate to backend:
command - cd online-library-catalog/backend
3.Install dependencies:
command - npm install
4.Set up your MySQL database and update db.js credentials.
5.Start the backend server:
command - node server.js
6.Open frontend/index.html in your browser.

## Folder Structure
online-library-catalog/
├─ backend/         # Node.js backend
├─ frontend/        # HTML, CSS, JS
├─ images/          # Book cover images
├─ uploads/         # Optional PDFs
└─ README.md

## Screenshots
1.Homepage / Book grid
![alt text](screenshots/homepage.png)

2.Book details modal
![alt text](screenshots/book-details.png)

3.Add Book form
![alt text](screenshots/add-book-form.png)
