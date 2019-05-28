const keys = ['1', '2', '3' , '4', '5', '6', '7', '8', '9', '*', '0', '#'];

const numpad = document.querySelector('.numpad');
const key = document.querySelector('.key')
let screen =  document.getElementById('screen')
let createPinBtn = document.getElementById('create');
let pin = '';

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function populateButtons() {
//  create a copy of the keys array
let newKeys = [...keys];

//  shuffle the new array
shuffle(newKeys);

//  loop through new array and make a button for each element
for (var i = 0; i < newKeys.length; i++) {
let btn = document.createElement('button');
btn.className = 'key'
btn.innerText= newKeys[i];

//  add an event listener to each btn that will add its value to the display
btn.addEventListener('click', function() {

  screen.value += btn.innerText;
  if (screen.value.length > 4) {
    screen.value = '';
  }
  else if (screen.value === pin) {
    screen.value = 'CORRECT'
  }



});
numpad.appendChild(btn);
  }
}

function removeButtons() {
  var div = document.getElementById("div");
  //  remove the keys but keep the display input and randomize btn
  while (div.childNodes.length > 6) {
    div.removeChild(div.lastChild);
}
}
// populate buttons on page load
    populateButtons();

let randomBtn = document.querySelector('.random')
randomBtn.addEventListener('click', function() {
  removeButtons();
  populateButtons();
})

function createPin() {

  if (screen.value.length == 4) {
    pin = screen.value;
  }

}

createPinBtn.addEventListener('click', createPin);