console.log('THIS IS GUESS-PHOTO CONTROLLER JS!!!');

const imageDir = '/images/games/guess-photo/';
const imgList = ['h1.jpg', 'h2.jpg', 'h3.jpg', 'h4.jpg', 'h5.jpg'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const img = document.querySelector("#img");

window.addEventListener('DOMContentLoaded', ()=>{
    
    img.src = `${imageDir + imgList[getRandomInt(4)]}`;
});

function moveLineToTarget(e){
    const x = e.clientX;
    const y = e.clientY;
    console.log(`${x}       ${y}`);
    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}

function moveLineToTargetMobile(e){
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    console.log(`${x}       ${y}`);
    img.style.filter= 'none';
    img.style.clip = `rect(${y-30}px, ${x-10}px, ${y-10}px, ${x-30}px)`;
}
const blackCover = document.querySelector('.black-cover');

window.addEventListener('load', ()=>{
    blackCover.style.width = `${img.width}px`;
    blackCover.style.height = `${img.height}px`;
});
//mousemove is not working on mobile. Should use touchmove
blackCover.addEventListener('mousemove', moveLineToTarget);
blackCover.addEventListener('touchmove', moveLineToTargetMobile);

//CSS clip reference:
//https://dirask.com/posts/CSS-clip-rect-style-property-example-QD9Rmp