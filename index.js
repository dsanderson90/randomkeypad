const keys = ['1', '2', '3' , '4', '5', '6', '7', '8', '9', '*', '0', '#'];
const numpad = document.querySelector('.numpad');
const screen =  document.getElementById('screen')
const createPinBtn = document.getElementById('create');
const div = document.getElementById("div");

let pin = null;
let correct = 'CORRECT'
let incorrect = 'INCORRECT'
let pinreq = 'Pin must be 4 digits'

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
    else if (screen.value.length == 4 && screen.value != pin && pin != null) {
      screen.value = incorrect
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
  //the pin must be 4 digits
   if (screen.value.length < 4) {
    screen.value = pinreq
  }
  else if (screen.value.length === 4) {
    pin = screen.value;
  }
  else {
    screen.value = pinreq
  }
}

function clearScreen() {
  screen.value = '';
}

function verifyPin() {
  if (screen.value == pin) {
    screen.value = correct
    document.body.style.backgroundColor = 'lime';
  }
  else {
    screen.value = incorrect
    document.body.style.backgroundColor = 'red';
  }

}

createPinBtn.addEventListener('click', function() {
  createPin();
  if(pin != null) {
  replaceBtn();
  removeButtons();
  populateButtons();
  clearScreen();
  screen.placeholder = 'Enter Your Pin'
  }
});

function replaceBtn() {

  let enter = document.createElement('button');
  enter.innerHTML = 'Enter Pin'
  enter.setAttribute('id', 'enter');

  let create = document.getElementById('create')
  create.insertAdjacentElement('beforebegin', enter);
  create.parentNode.removeChild(create);

  enter.addEventListener('click', function() {
    if (screen.value == pin) {
      verifyPin();
    }
    else {
      screen.value = incorrect
    }
  })
}

// keyboard events
document.onkeydown = function (e) {
  // if the key is a number add it to the screen
  // special chars and letters are not allowed.
  let key = Number(e.key)
  if(isNaN(key) == false || e.keyCode == 51 ||e.keyCode == 56) {
    screen.value += e.key
  }
  // backspace handling
  if(e.keyCode == 8 && screen.value != incorrect && screen.value != pinreq) {
    // remove one letter from the end of the string when backspace is hit.
    screen.value = screen.value.substring(0, screen.value.length-1)
  }
  if(e.keyCode == 8 && screen.value == incorrect|| screen.value == pinreq || screen.value == correct) {
    clearScreen();
  }
  // if Enter is press and pin is falsy create the pin, otherwise verify it.
  if(e.keyCode == 13) {
    if(!pin) {
       createPin();
       replaceBtn();
    }
    else {
      verifyPin();
    }
  }
  // if entered value length is 4, not null and not equal to the pin,
  // then verify the pin.
  else if (screen.value.length == 4 && screen.value != pin && pin != null) {
    verifyPin();
  }
};

