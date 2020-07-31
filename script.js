const pinGenerator = document.getElementById('generate-pin');
const showPin = document.getElementById('show-pin');
const getNumbers = document.querySelectorAll('[data-number]'); // It will select All number buttons.
const matchPin = document.getElementById('matcher-pin');
const deleteButton = document.getElementById('delete-number');
const clearAll = document.getElementById('clear-all');
const submit = document.getElementById('submit');
const matched = document.getElementById('matched');
const notMatched = document.getElementById('not-matched');
const tryStatus = document.getElementById('try-status');

// Generating random 4 digit number here..
function generatePin(){
    let pinGeneratorButton = Math.floor(1000 + Math.random() * 9000); // Making 4 digit random number.
    showPin.value = pinGeneratorButton;
    matched.style.display = 'none';
    notMatched.style.display = 'none';
    matchPin.value = '';
    submitCount = 0;            // Clicks for generating pin will make submit count 0.
    remainTry(submitCount);
}

// Making buttons clickable and able to show numbers
getNumbers.forEach(numbers => {
    numbers.addEventListener('click', () => {
        matchPin.value += numbers.textContent;
    })
})

// This makes Backspace workable
function deleteNum(){
    let matchPinValue = matchPin.value;
    let removeLastDigit = matchPinValue.substring(0, matchPinValue.length-1);
    matchPin.value = removeLastDigit;
}

// This will clear the input file
function clearButton(){
    matchPin.value = '';
}

// When submit Button will clicks this function will work.
function submitButton(){
    let matchPinValue = matchPin.value;
    let randomPin = showPin.value;
    if(matchPinValue === '' || randomPin === ''){
        matched.style.display = 'none';
        notMatched.style.display = 'none';
    }
    else if(matchPinValue !== randomPin) {
        matched.style.display = 'none';
        notMatched.style.display = 'block';
        submitCount++;                      // If not match it count's the clicks.
        remainTry(submitCount);
    }
    else if (matchPinValue === randomPin){
        matched.style.display = 'block';
        notMatched.style.display = 'none';
        submitCount = 0;                    // If Pin are matched submit will be 0.
        remainTry(submitCount);
    }
}

let submitCount = 0; // It's for counting clicks on submit button.
// How many Try are left this function will calculate that.
function remainTry(clickCount){
    if(clickCount < 3){
        tryStatus.innerText = 3 - clickCount;
    } 
    if(clickCount == 3){
        tryStatus.innerText = 0;
        submit.disabled = true;
    }
    if(clickCount == 0){
        tryStatus.innerText = 3;
        submit.disabled = false;
    }
}
