console.log('THIS IS GUESS-PHOTO CONTROLLER JS!!!');
const guessPhotoContextPath = '/games/guess-photo';
const imgDir = `/images${guessPhotoContextPath}/`;

const startBtn = document.querySelector('.btn.game-start');

window.addEventListener('DOMContentLoaded', ()=>{
    
});

async function getPhotoListAndRenderingGameArea() {
    const response = await fetch(domain + guessPhotoContextPath + '/data');

    if(response.status == 200){
        const data = await response.json();
        const {photoList} = data;
        renderGamePhotoArea(photoList);
    }else{
        alert('OOPS! Something Wrong with API CALL!!');
    }
}

function renderGamePhotoArea(data){
    const guessPhotoArea = document.querySelector('.game-area');

    let blackCover = document.createElement('div');
    blackCover.className = 'black-cover';

    let targetImg = document.createElement('img');
    targetImg.src = imgDir + data[0];
    
    if(!targetImg.width){
        alert('OOPS!');
    }else{
        blackCover.style.width = `${targetImg.width}px`;
        blackCover.style.height = `${targetImg.height}px`;
    
        blackCover.addEventListener('mousemove', function(e) { moveLineToTarget(targetImg, e); });
        blackCover.addEventListener('touchmove', function(e) { moveLineToTargetMobile(targetImg, e); });
    
        guessPhotoArea.appendChild(blackCover).appendChild(targetImg);
    }
}

function moveLineToTarget(img, e){
    const x = e.clientX;
    const y = e.clientY;
    console.log(`${x}       ${y}`);
    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}

function moveLineToTargetMobile(img, e){
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    console.log(`${x}       ${y}`);
    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}


startBtn.addEventListener('click', () => {
    getPhotoListAndRenderingGameArea();
});

//mousemove is not working on mobile. Should use touchmove
//CSS clip reference:
//https://dirask.com/posts/CSS-clip-rect-style-property-example-QD9Rmp