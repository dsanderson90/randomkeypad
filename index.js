const keys = ['1', '2', '3' , '4', '5', '6', '7', '8', '9', '*', '0', '#'];
const numpad = document.body.querySelector('.numpad');
const key = document.body.querySelector('.key')


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
let newKeys = [...keys];
shuffle(newKeys);
for (var i = 0; i < newKeys.length; i++) {
let btn = document.createElement('button');
btn.className = 'key'
btn.innerText= newKeys[i];
numpad.appendChild(btn);
  }
}

function removeButtons() {
  var div = document.getElementById("div");
while (div.firstChild) {
    div.removeChild(div.firstChild);
}
}
    populateButtons();

document.querySelector('.random').addEventListener('click', function() {
  removeButtons();
  populateButtons();
})
