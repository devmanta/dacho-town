console.log('THIS IS GUESS-PHOTO CONTROLLER JS!!!');
const guessPhotoContextPath = '/games/guess-photo';
const imgDir = `/images${guessPhotoContextPath}/`;

let [questions, answers, answerChoice] = [{}, {}, {}];

const gameArea = document.querySelector('.game-area');
const startBtn = document.querySelector('.btn.start');

window.addEventListener('DOMContentLoaded', ()=>{
    setInterval(()=>{
        let startBtn = document.querySelector('.btn.start');
        startBtn.style.color = getRandomColor();
    }, 150);
});

function changeStartBtnTextColor(startBtn){
    console.log('hello');
    startBtn.style.color = getRandomColor();
}

async function renderQuestionArea(gameArea) {
    if(isEmptyObject(questions)){
        const response = await fetch(domain + guessPhotoContextPath + '/question');
    
        if(response.status == 200){
            const data = await response.json();
            const {photoList} = data;
            const {photoAnswers} = data;
            insertQuestions(photoList);
            insertAnswers(photoAnswers);
        }else{
            alert('OOPS! Something Wrong with API CALL!!');
        }
    }
    await renderGamePhotoArea(gameArea);
}

async function renderGamePhotoArea(gameArea){
    const lastValueOfQuestions = questions.pop();
    const url = imgDir + lastValueOfQuestions;
    const targetImg = await loadImg(url);

    let blackCover = document.createElement('div');
    blackCover.className = 'black-cover';
    blackCover.style.width = `${targetImg.width}px`;
    blackCover.style.height = `${targetImg.height}px`;
    blackCover.addEventListener('mousemove', function(e) { moveLineToTarget(targetImg, e); });
    blackCover.addEventListener('touchmove', function(e) { moveLineToTargetMobile(targetImg, e); });

    gameArea.innerHTML = '';
    gameArea.appendChild(blackCover).appendChild(targetImg);
}

const loadImg = function loadImg(url) {
    const promise = new Promise(
        function resolver(resolve, reject){
            let img = new Image();
            img.src = url;
            img.onload = function(){
                resolve(img);
            };
            img.onerror = function(e){
                reject(e);
            }
        }
    );
    return promise;
};
async function renderAnswerArea(gameArea) {
    if(isEmptyObject(answerChoice)){
        const response = await fetch(domain + guessPhotoContextPath + '/answer-choice-list');
        if(response.status == 200){
            const data = await response.json();
            insertAnswerChoice(data);
        }else{
            alert('OOPS! Something Wrong with API CALL!!');
            throw new Error('Something Wrong with API CALL!!')
        }
    }
    renderAnswerChoiceArea(gameArea);
}

function renderAnswerChoiceArea(gameArea){
    const img = document.querySelector('.black-cover img');
    const answerArea = document.createElement('div');
    answerArea.className = 'answer-area';
    // answerArea.style.left = `${img.width / 2}px`;

    for(key in answerChoice) {
        let answerBox = document.createElement('div');
        answerBox.className = 'answer-box';

        const value = answerChoice[key];
        const randomIdx = getRandomIntInclusive(0, value.length-1);
        answerBox.innerText = value[randomIdx];
        answerBox.id = key;
        answerBox.addEventListener('click', async function(){
            const result = checkAnswer(img, this.id);
            if(result){ //정답
                stopTimer();
                transparentBlackCover();
                fireWorkInitInterval = startFireWork(150);
                sumTotalDuration();
                clearDisplayTimer();
                if(questions.length === 0){
                    alert('끝! 총 소요시간: ' + totalDuration);
                }else{
                    renderNextBtnArea(gameArea);
                }
                answerBox.childe
            }else{
                this.classList.add('shake');
                await delay(500);
                this.classList.remove('shake');
                this.classList.add('transition');
                this.classList.add('hidden');
            }
        });

        answerArea.appendChild(answerBox);
    }

    gameArea.appendChild(document.createElement('div')).appendChild(answerArea);
}

function transparentBlackCover(){
    const img = document.querySelector('.black-cover img');
    img.style.position = 'relative';
}

function renderNextBtnArea(gameArea){
    const btnArea = document.createElement('div');
    btnArea.className = 'btn-area';
    const nextBtn = document.createElement('button');
    nextBtn.innerText = '다음';
    nextBtn.className = 'btn next';
    nextBtn.addEventListener('click', ()=> {
        stopFireWork();
        renderNextQuestion();
    });

    btnArea.appendChild(nextBtn);
    gameArea.appendChild(btnArea);
}

async function renderNextQuestion(){
    await renderGamePhotoArea(gameArea);
    renderAnswerChoiceArea(gameArea);
    startTimer();
}

function insertQuestions(data){
    questions = shuffleArray(data);
}

function insertAnswers(data){
    answers = data;
}

function insertAnswerChoice(data){
    answerChoice = data;
}

function moveLineToTarget(img, e){
    const x = e.pageX - img.offsetLeft;
    const y = e.pageY - img.offsetTop;

    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}

function moveLineToTargetMobile(img, e){
    const x = e.touches[0].pageX - img.offsetLeft;
    const y = e.touches[0].pageY - img.offsetTop;

    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}

function startTimer(){
    int = setInterval(displayTimer,100);
}

async function renderAll() {
    try{
        await renderQuestionArea(gameArea);
        await renderAnswerArea(gameArea);
        startTimer();
        startBtn.style.display = 'none';
    }catch(e){
        alert('OOPS! Something Wrong with Rendering!!');
    }
}

startBtn.addEventListener('click', () => {
    renderAll();
});

function checkAnswer(img, key){
    let photoName = img.src.split('/').pop();
    photoName = photoName.substring(0, photoName.lastIndexOf('.'));
    if(key == answers[photoName]){
        return true;
    }
    return false;
}


//mousemove is not working on mobile. Should use touchmove
//CSS clip reference:
//https://dirask.com/posts/CSS-clip-rect-style-property-example-QD9Rmp