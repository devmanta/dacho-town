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

//Timer
let [milliseconds,seconds, totalDuration] = [0,0,0];
let int = null;

function displayTimer(el){
    milliseconds+=1;
    if(milliseconds == 10){
        milliseconds = 0;
        seconds++;
    }

    el.innerText = `${seconds}.${milliseconds}`;
}

function startTimer(el){
    [milliseconds,seconds] = [0,0];
    int = setInterval(displayTimer(el), 100);
}

function clearTimer(){
    clearInterval(int);
}

function addTotalDuration(el){
    totalDuration += Number(el.innerText);
}