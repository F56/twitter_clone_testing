let fname = document.getElementById('firstname-sp');
let lname = document.getElementById('lastname-sp');
let username = document.getElementById('username-sp');

function capitalize(string) {
  let lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
}

fname.addEventListener('blur', (e) => { console.log(e.target.value); username.value = capitalize(e.target.value)})
lname.addEventListener('blur', (e) => { console.log(e.target.value); username.value = username.value + capitalize(e.target.value) + Math.floor(Math.random() * (200 - 1)) + 1})

