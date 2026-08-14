var timer = 60;
var score = 0;
var hitrn = 0;

function updateScore(){
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function getNewHit(){
    hitrn = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = hitrn;
}

function getBubbleCount(){
    var container = document.querySelector("#pbttm");
    var cs = getComputedStyle(container);
    var availWidth = container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var availHeight = container.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    var gap = parseFloat(cs.gap) || 8;

    var temp = document.createElement("div");
    temp.className = "bubble";
    temp.style.visibility = "hidden";
    container.appendChild(temp);
    var bubbleSize = temp.getBoundingClientRect().width;
    container.removeChild(temp);

    if(!bubbleSize || availWidth <= 0 || availHeight <= 0){
        return 150;
    }

    var cell = bubbleSize + gap;
    var cols = Math.max(Math.floor((availWidth + gap) / cell), 1);
    var rows = Math.max(Math.floor((availHeight + gap) / cell), 1);
    return Math.max(cols * rows, 10);
}

function makeBubble(){
    var count = getBubbleCount();
    var clutter = ""

for(var i = 1; i <= count; i++){
    var rn = Math.floor(Math.random()*10);
    clutter += `<div class="bubble">${rn}</div>`;
}
document.querySelector("#pbttm").innerHTML = clutter
}

function runTimer(){
    var timeInt = setInterval(function(){
        if(timer > 0){
        timer--;
        }
        else{
             clearInterval(timeInt);
             var pbttm = document.querySelector("#pbttm");
             pbttm.textContent = "GAME OVER!";
             pbttm.classList.add("gameover");
        }
    document.querySelector("#timerval").textContent = timer;
    },1000)    
}

document.querySelector("#pbttm").addEventListener("click",function(dets){
    var clickedNum = Number(dets.target.textContent);
    if(clickedNum == hitrn){
        updateScore();
        makeBubble();
        getNewHit();
    }

})
var resizeTimeout;
window.addEventListener("resize", function(){
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function(){
        makeBubble();
    }, 200);
});

makeBubble();
runTimer();
getNewHit();