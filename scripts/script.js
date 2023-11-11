





const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.inner-screen');
let screenState = 0;
let decimalDivisor = 1;
let operator = "";
let previousState = null;

[...buttons].map((button) => button.addEventListener('mousedown',() => button.style.opacity = .5));
[...buttons].map((button) => button.addEventListener('mouseup',() => button.style.opacity = 1));

([...buttons]
    .filter((button) => button.className.search('(top|right|decimal)') == -1)
    .map((button) => button.addEventListener('click',() => {

        if (screenState == previousState ) {
            screen.textContent = button.textContent;
            screenState = +button.textContent;
        }
        else if (operator == "=") {
            screen.textContent = button.textContent;
            screenState = button.textContent;
            operator = "";
        }
        else if (operator != "") {
            screen.textContent = (screen.textContent == "0") ? button.textContent : screen.textContent + button.textContent;
            screenState += button.textContent;
        } else {
            screen.textContent = (screen.textContent == "0") ? button.textContent : screen.textContent + button.textContent;
            screenState += button.textContent;
        }
    })));

const clear = document.querySelector('#clear');
clear.addEventListener('click',() => {
    screen.textContent = "0";
    screenState = "0";
    previousState = null;
    operator = "";
});

const negate = document.querySelector('#negate');
negate.addEventListener('click',() => {
    screenState*=-1;
    screen.textContent = ""+screenState;
});

const percent = document.querySelector('#percent');
percent.addEventListener('click',() => {
    screenState*=.01;
    screen.textContent = ""+screenState;
});

const operators = document.querySelectorAll('.right');
[...operators]
    .filter((button) => button.id != "equal")
    .map((button) => button.addEventListener('click', () => {
    [...operators].map((operator) => operator.style.filter = "brightness(1.0");

    previousState = screenState;

    screenState = (operator != "" && operator != "=") ? 0 : screenState;
    operator = button.textContent;
    button.style.filter = "brightness(1.5)";
}));

const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
    console.log(operator);
    console.log(screenState);
    switch (true) {
        case (operator === "/"):
            screenState = "" + (+previousState / +screenState);
            screen.textContent = "" + +screenState;
            break;
        case (operator === "*"):
            screenState = "" + (+previousState * +screenState);
            screen.textContent = "" + +screenState;
            break;
        case (operator === "-"):
            screenState = "" + (+previousState - +screenState);
            screen.textContent = "" + +screenState;
            break;
        case (operator === "+"):
            screenState = "" + (+previousState + +screenState);
            screen.textContent = "" + +screenState;
            break;
    }
    previousState = null;
    console.log(screenState);
    if (screenState.length > 10) {
        if (screenState.search('\.') == -1) {
            screenState = screenState.substring(screenState.length-10);
        } else {
            let screenStateSplit = screenState.split('.');
            if (screenStateSplit[0].length >= 10) {
                screenState = screenState.substring(screenState.length-10);
            } else if (screenStateSplit[0].length < 10) {
                screenState = screenStateSplit[0] + "." + screenStateSplit[1].substring(0,10-screenStateSplit[0].length);
            }
        }
    }
    console.log(screenState);
    screen.textContent = "" + screenState;
    operator = "=";
});

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', ()=> {
    if (screen.textContent.search('\.') == -1) {
        screen.textContent+=".";
        decimalDivisor = 10;
    } 
})



