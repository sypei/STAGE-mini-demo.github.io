/*eslint-env browser*/
var frog = document.getElementById("frog");

// Execute a function when the user presses a key on the keyboard
document.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
    "use strict";
    if (event.keyCode === 13) {
        if(frog.classList.contains("frog-jump")) {
            frog.classList.remove("frog-jump"); //reset
            void frog.offsetWidth;
        }
        frog.classList.add("frog-jump");
    }
});