console.log('THIS IS GUESS-PHOTO CONTROLLER JS!!!');
const guessPhotoContextPath = '/games/guess-photo';
const imgDir = `/images${guessPhotoContextPath}/`;

let [questions, answers, answerChoice] = [{}, {}, {}];

const gameArea = document.querySelector('.game-area');
const startBtn = document.querySelector('.btn.start');

window.addEventListener('DOMContentLoaded', ()=>{
    
});

async function renderQuestionArea(gameArea) {
    const response = await fetch(domain + guessPhotoContextPath + '/question');

    if(response.status == 200){
        const data = await response.json();
        const {photoList} = data;
        const {photoAnswers} = data;
        insertAnswers(photoAnswers);
        await renderGamePhotoArea(photoList, gameArea);
    }else{
        alert('OOPS! Something Wrong with API CALL!!');
    }
}

async function renderAnswerArea(gameArea) {
    console.log('일로오나 renderAnswerArea');
    const response = await fetch(domain + guessPhotoContextPath + '/answer-choice-list');

    if(response.status == 200){
        const data = await response.json();
        insertAnswerChoice(data);
        renderAnswerChoiceArea(data, gameArea);
    }else{
        alert('OOPS! Something Wrong with API CALL!!');
        throw new Error('Something Wrong with API CALL!!')
    }
}

async function renderGamePhotoArea(data, gameArea){
    questions = shuffleArray(data);

    let blackCover = document.createElement('div');
    blackCover.className = 'black-cover';

    let targetImg = document.createElement('img');
    targetImg.src = imgDir + questions[0];
    
    if(!targetImg.width){
        alert('OOPS! Something Wrong with getting Image');
        throw new Error("Whoops!");
    }else{
        blackCover.style.width = `${targetImg.width}px`;
        blackCover.style.height = `${targetImg.height}px`;
        blackCover.addEventListener('mousemove', function(e) { moveLineToTarget(targetImg, e); });
        blackCover.addEventListener('touchmove', function(e) { moveLineToTargetMobile(targetImg, e); });
        gameArea.appendChild(blackCover).appendChild(targetImg);
    }
}

function renderAnswerChoiceArea(data, gameArea){
    const answerArea = document.createElement('div');
    answerArea.className = 'answer-area';

    for(key in data) {
        // console.log('key:' + key + ' / ' + 'value:' + data[key]);
    }

    gameArea.appendChild(answerArea);
}

function insertAnswers(data){
    answers = data;
}

function insertAnswerChoice(data){
    answerChoice = data;
}

function moveLineToTarget(img, e){
    const x = e.pageX - img.offsetLeft + img.scrollLeft;
    const y = e.pageY - img.offsetTop + img.scrollTop;

    console.log(`여기 ${x}       ${y}`);
    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}

function moveLineToTargetMobile(img, e){
    const x = e.touches[0].pageX - img.offsetLeft + img.scrollLeft;
    const y = e.touches[0].pageY - img.offsetTop + img.scrollTop;
    console.log(`${x}       ${y}`);
    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}

function renderBtnArea(gameArea){
    const btnArea = document.createElement('div');
    btnArea.className = 'btn-area';
    const nextBtn = document.createElement('button');
    nextBtn.innerText = '다음';
    nextBtn.className = 'btn next';
    btnArea.appendChild(nextBtn);

    gameArea.appendChild(btnArea);
}

async function renderAll() {
    try{
        await renderQuestionArea(gameArea);
        renderAnswerArea(gameArea);
        renderBtnArea(gameArea);
    }catch(e){
        alert('OOPS! Something Wrong with Rendering!!');
    }
}

startBtn.addEventListener('click', () => renderAll());

//mousemove is not working on mobile. Should use touchmove
//CSS clip reference:
//https://dirask.com/posts/CSS-clip-rect-style-property-example-QD9Rmp