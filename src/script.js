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

togglerValue = document.getElementById('book-is-read');
togglerText = document.getElementById('book-is-read-text');

togglerValue.addEventListener('change', () => {
  if(togglerValue.checked === true){
    togglerText.textContent = "Read ✓"
  }
  else {
    togglerText.textContent = "Unread ✗"
  }
  console.log(togglerValue.checked);
})
