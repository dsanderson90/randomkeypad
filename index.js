const keys = ['1', '2', '3' , '4', '5', '6', '7', '8', '9', '*', '0', '#'];

const numpad = document.querySelector('.numpad');
const screen =  document.getElementById('screen')
const createPinBtn = document.getElementById('create');
let pin = null;

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
let key = document.createElement('button');
key.className = 'key'
key.innerText= newKeys[i];

//  add an event listener to each btn that will add its value to the display
key.addEventListener('click', function() {

  screen.value += key.innerText;
  if (screen.value.length > 4) {
    screen.value = '';
  }
  else if (screen.value === pin) {
    screen.value = 'CORRECT'
  }



});
numpad.appendChild(key);
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
  clearScreen();
  removeButtons();
  populateButtons();
})

function createPin() {

  if (screen.value.length == 4) {
    pin = screen.value;
  }
  else {
    screen.placeholder = 'Pin must be 4 digits'
  }

}

function clearScreen() {
  screen.value = '';
}

createPinBtn.addEventListener('click', function() {
  createPin();
  clearScreen();
  screen.placeholder = 'Enter Your Pin'
});


// keyboard events
document.onkeydown = function (e) {
  if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        screen.value += e.key
  }
  if(e.keyCode == 8) {
    screen.value = screen.value.substring(0, screen.value.length-1)
  }
  if(e.keyCode == 13) {
    createPin();
    clearScreen();
    screen.placeholder = 'Enter Your Pin'
  }
  if (screen.value == pin) {
    screen.value = 'CORRECT'
  }
};