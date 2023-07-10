// Library Array
const myLibrary = [];

// Constructor
function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

// Prototype
Book.prototype.setReadStatus = function(isRead){
  this.isRead = isRead;
}

// Function to add a book to the library
function addBookToLibrary(formTitle, formAuthor, formNumPages, formIsRead){
  // Add book to the array
  myLibrary.push(new Book(formTitle, formAuthor, formNumPages, formIsRead));
  const index = myLibrary.length - 1;
  // Add book to the DOM
  // Get the parent container element
  const parentContainer = document.getElementById('book-container');

  // Create the book card structure
  const bookCard = document.createElement('div');
  bookCard.classList.add('book', 'w-80', 'p-4', 'gap-2', 'bg-gray-200', 'flex', 'flex-col', 'items-center', 'shadow-md', 'border', 'rounded-lg');

  const title = document.createElement('div');
  title.classList.add('title', 'text-lg', 'font-bold');
  title.textContent = formTitle;

  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = formAuthor;

  const pages = document.createElement('div');
  pages.classList.add('pages-number');
  pages.textContent = `${formNumPages} pages`;

  const label = document.createElement('label');
  label.setAttribute('for', `book-is-read${index}`); //
  label.classList.add('flex', 'items-center', 'cursor-pointer');

  const readText = document.createElement('div');
  readText.id = `book-is-read-text${index}`; //
  readText.classList.add('mr-3', 'text-gray-700', 'font-medium');

  
  const toggleContainer = document.createElement('div');
  toggleContainer.classList.add('relative');
  
  const toggleInput = document.createElement('input');
  toggleInput.id = `book-is-read${index}`; //
  toggleInput.type = 'checkbox';
  toggleInput.classList.add('sr-only');
  
  if(formIsRead === true){
    toggleInput.checked = true;
    readText.textContent = "Read ✓";
  }
  else {
    readText.textContent = 'Unread ✗';
  }

  handleToggleChange(toggleInput, readText, index);

  const toggleBackground = document.createElement('div');
  toggleBackground.classList.add('w-10', 'h-4', 'bg-gray-400', 'rounded-full', 'shadow-inner');

  const toggleDot = document.createElement('div');
  toggleDot.classList.add('dot', 'absolute', 'w-6', 'h-6', 'bg-red-600', 'rounded-full', 'shadow', '-left-1', '-top-1', 'transition');

  // Append the elements to the book card structure
  label.appendChild(readText);
  toggleContainer.appendChild(toggleInput);
  toggleContainer.appendChild(toggleBackground);
  toggleContainer.appendChild(toggleDot);
  label.appendChild(toggleContainer);

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(label);

  // Append the book card to the parent container
  parentContainer.appendChild(bookCard);
}

function handleToggleChange(toggleInput, readText, index) {
  toggleInput.addEventListener('change', () => {
    if(toggleInput.checked === true){
      readText.textContent = "Read ✓"
      const isRead = toggleInput.checked;
      myLibrary[index].setReadStatus(isRead);
    }
    else {
      readText.textContent = "Unread ✗"
      const isRead = toggleInput.checked;
      myLibrary[index].setReadStatus(isRead);
    }
    console.log(myLibrary);
  });
}

// Forms Popup
addButton = document.getElementById('addButton');
overlay = document.getElementById('overlay');

form = document.getElementById('form');
cancelButton = document.getElementById('cancelButton');
confirmButton = document.getElementById('confirmButton');

addButton.addEventListener('click', () => {
  overlay.classList.remove('hidden');
  form.reset();
})

cancelButton.addEventListener('click', () => {
  overlay.classList.add('hidden');
})

confirmButton.addEventListener('click', () => {
  const formTitle = document.getElementById('form-title').value;
  const formAuthor = document.getElementById('form-author').value;
  const formNumPages = document.getElementById('form-pages-number').value;
  const formIsRead = document.getElementById('form-is-read').checked;
  // console.log(formTitle, formAuthor, formNumPages, formIsRead);

  addBookToLibrary(formTitle, formAuthor, formNumPages, formIsRead);

  overlay.classList.add('hidden');
  event.preventDefault();
})