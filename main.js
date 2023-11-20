const prompt = require('prompt-sync')();
let books = [
  { id: "1", title: "Start with why", author: "Simon Sinek", price: 80.0, quantity: 13 },
  { id: "2", title: "But how do it know", author: "J. Clark Scott", price: 59.9, quantity: 22 },
  { id: "3", title: "Clean Code", author: "Robert Cecil Martin", price: 50.0, quantity: 5 },
  { id: "4", title: "Zero to One", author: "Peter Thiel", price: 45.0, quantity: 12 },
  { id: "5", title: "You don't know JS", author: "Kyle Simpson", price: 39.9, quantity: 9 }
];

function addBook() {
  let id = prompt("Enter book ID:");
  let title = prompt("Enter book title:");
  let author = prompt("Enter book author:");
  let price = parseFloat(prompt("Enter book price:"));
  let quantity = parseInt(prompt("Enter book quantity:"));

  let book = { id, title, author, price, quantity };
  books.push(book);

  console.log("Book added successfully.");
}

function editBook() {
  let id = prompt("Enter book ID to edit:");
  let book = books.find((item) => item.id === id);

  if (book) {
    book.title = prompt("Enter new book title:", book.title);
    book.author = prompt("Enter new book author:", book.author);
    book.price = parseFloat(prompt("Enter new book price:", book.price));
    book.quantity = parseInt(prompt("Enter new book quantity:", book.quantity));

    console.log("Book edited successfully.");
  } else {
    console.log("Book not found.");
  }
}

function deleteBook() {
  let id = prompt("Enter book ID to delete:");
  let index = books.findIndex((item) => item.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    console.log("Book deleted successfully.");
  } else {
    console.log("Book not found.");
  }
}

function viewBookInformation() {
  let input = prompt("Enter book ID, title, or author to search:");
  let results = books.filter(
    (book) =>
      book.id === input ||
      book.title.toLowerCase().includes(input.toLowerCase()) ||
      book.author.toLowerCase().includes(input.toLowerCase())
  );

  if (results.length > 0) {
    console.log("Search results:");
    results.forEach((book) => {
      console.log(`ID: ${book.id}`);
      console.log(`Title: ${book.title}`);
      console.log(`Author: ${book.author}`);
      console.log(`Price: $${book.price}`);
      console.log(`Quantity: ${book.quantity}`);
      console.log("===============================");
    });
  } else {
    console.log("No books found matching the search criteria.");
  }
}

function sellBooks() {
  let title = prompt("Enter book title to sell:");
  let quantity = parseInt(prompt("Enter quantity to sell:"));
  let book = books.find((item) => item.title === title);

  if (book) {
    if (book.quantity >= quantity) {
      let totalPrice = book.price * quantity;
      let confirmation = confirm(
        `Are you sure you want to sell ${quantity} copies of "${book.title}" for a total of $${totalPrice}?`
      );

      if (confirmation) {
        book.quantity -= quantity;
        console.log("Sale completed. Invoice generated:");
        console.log(`Title: ${book.title}`);
        console.log(`Author: ${book.author}`);
        console.log(`Price per unit: $${book.price}`);
        console.log(`Quantity sold: ${quantity}`);
        console.log(`Total price: $${totalPrice}`);
      } else {
        console.log("Sale canceled.");
      }
    } else {
      console.log("Insufficient quantity.");
    }
  } else {
    console.log("Book not found.");
  }
}

function displayMenu() {
  console.log("Bookstore Menu:");
  console.log("1. Add a book");
  console.log("2. Edit a book");
  console.log("3. Delete a book");
  console.log("4. View book information");
  console.log("5. Sell books and generate invoice");
  console.log("0. Exit");
}

function runBookstore() {
  let choice;

  do {
    displayMenu();
    choice = parseInt(prompt("Enter your choice:"));

    switch (choice) {
      case 1:
        addBook();
        break;
      case 2:
        editBook();
        break;
      case 3:
        deleteBook();
        break;
      case 4:
        viewBookInformation();
        break;
      case 5:
        sellBooks();
        break;
      case 0:
        console.log("Exiting the program...");
        break;
      default:
        console.log("Invalid choice! Please try again.");
    }
  } while (choice !== 0);
}

runBookstore();