const square = document.getElementById("square");

const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const recordText = document.getElementById("record");

const message = document.getElementById("message");

const restart = document.getElementById("restart");

let score = 0;

let time = 30;

let playing = true;

let size = 60;

let timer;
let mover;

let record = localStorage.getItem("record") || 0;

recordText.textContent = record;

function beep(freq){

    const audio = new AudioContext();

    const osc = audio.createOscillator();

    const gain = audio.createGain();

    osc.frequency.value = freq;

    osc.connect(gain);

    gain.connect(audio.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 0.15
    );

    osc.stop(audio.currentTime + 0.15);

}

function random(min,max){

    return Math.floor(Math.random()*(max-min)+min);

}

function randomColor(){

    return `hsl(${random(0,360)},80%,60%)`;

}

function moveSquare(){

    if(!playing) return;

    const game = document.getElementById("game");

    const maxX = game.clientWidth-size;

    const maxY = game.clientHeight-size;

    square.style.left = random(0,maxX)+"px";

    square.style.top = random(0,maxY)+"px";

    square.style.background = randomColor();

}

square.addEventListener("click",()=>{

    if(!playing) return;

    score++;

    beep(700);

    scoreText.textContent = score;

    if(size>25){

        size-=2;

        square.style.width=size+"px";

        square.style.height=size+"px";

    }

    moveSquare();

});

function finish(){

    playing=false;

    clearInterval(timer);

    clearInterval(mover);

    beep(250);

    if(score>record){

        record=score;

        localStorage.setItem("record",record);

        recordText.textContent=record;

        message.textContent="🏆 Novo Recorde!";

    }else{

        message.textContent="Fim de jogo!";

    }

}

function start(){

    score=0;
    time=30;
    size=60;
    playing=true;

    scoreText.textContent=0;
    timeText.textContent=30;

    message.textContent="";

    square.style.width=size+"px";
    square.style.height=size+"px";

    moveSquare();

    clearInterval(timer);
    clearInterval(mover);

    timer=setInterval(()=>{

        time--;

        timeText.textContent=time;

        if(time<=0){

            finish();

        }

    },1000);

    mover=setInterval(()=>{

        moveSquare();

    },800);

}

restart.addEventListener("click",start);

start();