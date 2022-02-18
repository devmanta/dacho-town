const domain = 'http://192.168.10.70:3000';
// const MyPromise = require('some-promise-lib');
// const confetti = require('canvas-confetti');
// confetti.Promise = MyPromise;

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

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

//Confetti Reference:
// https://www.kirilv.com/canvas-confetti/
var duration = 15 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
let interval = null;
let fireWorkInterval = null;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function fireWork() {
    var timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
}

function startFireWork(milliseconds){
    fireWorkInterval = setInterval(fireWork, milliseconds);
}

function stopFireWork(){
    clearInterval(fireWorkInterval);
}