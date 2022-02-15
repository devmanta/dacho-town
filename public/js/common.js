const domain = 'http://localhost:3000';

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
  }

function isEmptyObject(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
}

//Timer START
let [milliseconds,seconds, totalDuration] = [0,0,0];
let timerRef = document.querySelector('.timer span');
let int = null;
function displayTimer(){
    timerRef.innerText = '';
    
    milliseconds+=1;
    if(milliseconds == 10){
        milliseconds = 0;
        seconds++;
    }
    let displayDuration = `${seconds}.${milliseconds}`;
    timerRef.innerText = displayDuration;
}

function stopTimer(){
    clearInterval(int);
}

function sumTotalDuration(){
    totalDuration += Number(timerRef.innerText);
}
//Timer END