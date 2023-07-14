// Library Array
const myLibrary = [];

class Book {
  constructor(title, author, numPages, isRead, index) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.index = index
  }

  setReadStatus(isRead) {
    this.isRead = isRead;
  }

  handleToggleChange(toggleInput, readText) {
    toggleInput.addEventListener('change', () => {
      if(toggleInput.checked === true){
        readText.textContent = "Read ✓"
        const isRead = toggleInput.checked;
        myLibrary[this.index].setReadStatus(isRead);
      }
      else {
        readText.textContent = "Unread ✗"
        const isRead = toggleInput.checked;
        myLibrary[this.index].setReadStatus(isRead);
      }
      console.log(myLibrary);
    });
  }

  deleteBook(deleteButton, index) {
    deleteButton.addEventListener('click', () => {
      const book = document.getElementById(`book-${index+1}`);
      book.remove();
      myLibrary.splice(this.index, 1);
      updateIndex(index);
    });
  }
}

// Function to add a book to the library
function addBookToLibrary(formTitle, formAuthor, formNumPages, formIsRead){
  // Add book to the array
  const index = myLibrary.length;
  myLibrary.push(new Book(formTitle, formAuthor, formNumPages, formIsRead, index));
  // Add book to the DOM
  // Get the parent container element
  const parentContainer = document.getElementById('book-container');

  // Create the book card structure
  const bookCard = document.createElement('div');
  bookCard.classList.add('book', 'w-80', 'p-4', 'gap-2', 'bg-gray-200', 'flex', 'flex-col', 'items-center', 'justify-center', 'shadow-md', 'border', 'rounded-lg', 'relative');
  bookCard.id = `book-${index+1}`;

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
  label.setAttribute('for', `book-is-read${index+1}`); //
  label.classList.add('flex', 'items-center', 'cursor-pointer');

  const readText = document.createElement('div');
  readText.id = `book-is-read-text${index+1}`; //
  readText.classList.add('mr-3', 'text-gray-700', 'font-medium');

  
  const toggleContainer = document.createElement('div');
  toggleContainer.classList.add('relative');
  
  const toggleInput = document.createElement('input');
  toggleInput.id = `book-is-read${index+1}`; //
  toggleInput.type = 'checkbox';
  toggleInput.classList.add('sr-only');
  
  if(formIsRead === true){
    toggleInput.checked = true;
    readText.textContent = "Read ✓";
  }
  else {
    readText.textContent = 'Unread ✗';
  }

  myLibrary[index].handleToggleChange(toggleInput, readText);

  const toggleBackground = document.createElement('div');
  toggleBackground.classList.add('w-10', 'h-4', 'bg-gray-400', 'rounded-full', 'shadow-inner');

  const toggleDot = document.createElement('div');
  toggleDot.classList.add('dot', 'absolute', 'w-6', 'h-6', 'bg-red-600', 'rounded-full', 'shadow', '-left-1', '-top-1', 'transition');

  const deleteBookButton = document.createElement('button');
  deleteBookButton.id = 'deleteBook';
  deleteBookButton.type = 'button';
  deleteBookButton.classList.add('absolute', 'top-1', 'right-1', 'w-5', 'h-5');

  const deleteSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  deleteSVG.classList.add('hover:fill-red-700');
  deleteSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  deleteSVG.setAttribute('viewBox', '0 0 24 24');

  // Create the title element
  const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleElement.textContent = 'delete-book';

  // Create the path element
  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathElement.setAttribute('d', 'M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z');

  // Append the title and path elements to the SVG element
  deleteSVG.appendChild(titleElement);
  deleteSVG.appendChild(pathElement);

  deleteBookButton.appendChild(deleteSVG);

  myLibrary[index].deleteBook(deleteBookButton, index);

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
  bookCard.appendChild(deleteBookButton);

  // Append the book card to the parent container
  parentContainer.appendChild(bookCard);
}



// Function to update the index number (changes after a delete)
function updateIndex(index) {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
    index = i;

    const bookCard = document.getElementById(`book-${i}`);
    const readText = document.getElementById(`book-is-read-text${i}`);
    const toggleInput = document.getElementById(`book-is-read${i}`);

    // Update the class names
    if (bookCard) {
      // Update the class names
      bookCard.id = `book-${i}`;
    }

    if (readText) {
      readText.id = `book-is-read-text${i}`;
    }

    if (toggleInput) {
      toggleInput.id = `book-is-read${i}`;
    }
  }

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

addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 336, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('The Great Gatsby', 'F.Scott Fitzgerald', 180, true);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 432, false);
addBookToLibrary('The catcher in the Rye', 'J.D.Salinger', 224, true);
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);