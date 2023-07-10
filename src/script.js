addButton = document.getElementById('addButton');
addForm = document.getElementById('add-book-form');

form = document.getElementById('form');
cancelButton = document.getElementById('cancelButton');
confirmButton = document.getElementById('confirmButton');

addButton.addEventListener('click', () => {
  addForm.classList.remove('hidden');
  form.reset();
})

cancelButton.addEventListener('click', () => {
  addForm.classList.add('hidden');
})