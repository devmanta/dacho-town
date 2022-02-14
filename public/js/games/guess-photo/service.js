console.log('THIS IS GUESS-PHOTO CONTROLLER JS!!!');
const guessPhotoContextPath = '/games/guess-photo';
const imgDir = `/images${guessPhotoContextPath}/`;

let [questions, answers, answerChoice] = [{}, {}, {}];

const gameArea = document.querySelector('.game-area');
const startBtn = document.querySelector('.btn.start');

window.addEventListener('DOMContentLoaded', ()=>{
    
});

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
    let blackCover = document.createElement('div');
    blackCover.className = 'black-cover';

    let targetImg = document.createElement('img');
    targetImg.src = imgDir + questions.pop();
    targetImg.id = 'questionPhoto';
    
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
    const img = document.getElementById('questionPhoto');
    const answerArea = document.createElement('div');
    answerArea.className = 'answer-area';
    answerArea.style.left = `${img.width / 2}px`;
    for(key in answerChoice) {
        let answerBox = document.createElement('div');
        answerBox.className = 'answer-box';

        const value = answerChoice[key];
        const randomIdx = getRandomIntInclusive(0, value.length-1);
        answerBox.innerText = value[randomIdx];
        answerBox.id = key;

        answerBox.addEventListener('click', function(){
            const result = checkAnswer(img, this.id);
            if(result){
                alert('정답!');
            }else{
                alert('땡!');
            }
        });
        answerArea.appendChild(answerBox);
    }

    gameArea.appendChild(answerArea);
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

async function renderAll() {
    try{
        await renderQuestionArea(gameArea);
        await renderAnswerArea(gameArea);
        renderBtnArea(gameArea);
        startBtn.style.display = 'none';
    }catch(e){
        alert('OOPS! Something Wrong with Rendering!!');
    }
}

startBtn.addEventListener('click', () => renderAll());

function checkAnswer(img, key){
    let photoName = img.src.split('/').pop();
    photoName = photoName.substring(0, photoName.lastIndexOf('.'));
    console.log('photoName>>>> ' + photoName);
    if(key == answers[photoName]){
        return true;
    }
    return false;
}

//mousemove is not working on mobile. Should use touchmove
//CSS clip reference:
//https://dirask.com/posts/CSS-clip-rect-style-property-example-QD9Rmp