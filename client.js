const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown",key_down,false);
document.addEventListener("keyup",key_up,false);
let sceneManager = 0;

let press_key;

let deltaTime;
let timeOrigin;

let nNumbers = [2,3,5,7,11,13,17];

let soloGameOver = {
    record:0,
    setup:function(score){
        sceneManager = 2;
        this.record = score; 
    },
    draw:function(){
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "200px meiryo";
        ctx.fillText(String(this.record),canvas.width / 2,canvas.height / 2,canvas.width - 100);

    },
    update:function(){
        if(press_key == "Enter"){
            title.setup();
        }
    }

}


let soloGame = {
    time:0,
    score:0,
    sizeEffect:1,
    question:0,
    level:2,
    levelCount:0,
    input:"",
    combo:0,
    setup:function(){
        console.log(toString(this.question));
        sceneManager = 1;
        this.time = 800;
        this.score = 0;
        this.level = 2;
        this.combo = 0;
        this.new_question();
    },
    draw:function(){
        ctx.font = String(200 * this.sizeEffect) + "px meiryo";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(this.question),canvas.width / 2,canvas.height / 2 + 30,canvas.width - 100);
        
        ctx.font = "70px meiryo_l";
        ctx.fillText(this.input,canvas.width / 2,canvas.height / 2 + 220);

        ctx.fillStyle = "#dd0000";
        ctx.fillRect(0,0,this.time / 800 * canvas.width,100);

        ctx.fillStyle = "#fff";
        ctx.font = "40px meiryo"
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillText("combo",50,200);
        ctx.fillText("score",50,270);

        ctx.font = "50px meiryo";
        ctx.fillText(String(this.score),200,270);
        
        ctx.fillStyle = "#ffff00";
        ctx.font = String(70 * this.sizeEffect) + "px meiryo";
        ctx.fillText(String(this.combo),200,200);

    },
    update:function(){
        this.time -= 1;
        this.sizeEffect += (1 - this.sizeEffect) / 2;
        if(!isNaN(press_key) && press_key != null && press_key != " "){
           this.input += press_key; 
        }
        if(press_key == 'Backspace'){
            this.input = this.input.substring(0,this.input.length - 1);
        }
        if(press_key == "Enter"){
            if(nNumbers.includes(Number(this.input))){
                if(this.question % Number(this.input) == 0){
                    this.question /= Number(this.input);
                    this.combo++;
                    this.score += 100 + 10 * this.combo;
                    if(this.question == 1){
                        this.score += 500 + 100 * this.combo;
                        this.new_question();
                        this.time = 800;
                        if(this.levelCount > 5){
                            this.level++;
                            this.levelCount = 0
                        }else{
                            this.levelCount++;
                        }
                    }
                    this.sizeEffect = 1.4;
                }else{
                    this.time -= 80;
                    this.combo = 0;
                }
                this.input = "";
            }
        }
        if(this.time <= 0){
            soloGameOver.setup(this.score);
        }
    },
    new_question:function(){
        this.question = 1;
        for(var i=0;i<this.level;i++){
            this.question *= nNumbers[Math.floor(Math.random() * nNumbers.length)];
        }
    }
}

let title = {
    setup:function(){
        sceneManager = 0;
    },
    draw:function(){

        ctx.fillStyle = "#fff";
        ctx.font = "100px meiryo";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("素因数分解",50,50);


        ctx.font = "30px meiryo_l";
        ctx.fillText("一人でプレイ",50,400);

    },
    update:function(){
        if(press_key == "w"){
           soloGame.setup();    
        }
    },
    select:0
}

function key_down(e){
    press_key = e.key;
}

function key_up(e){
    
}

function init(){
    const font1 = new FontFace("meiryo_l","url(fonts/meiryo.ttc)");
    font1.load().then(loadedFont => {
        document.fonts.add(loadedFont);
        const font = new FontFace("meiryo","url(fonts/meiryob.ttc)");
        font.load().then(loadedFont => {
            document.fonts.add(loadedFont);
            main();
        });
    })
}


function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    switch(sceneManager){
        case 0:
            title.draw(); 
            break;
        case 1:
            soloGame.draw();
            break;
        case 2:
            soloGameOver.draw();
            break;
    }    
}

function update(){
    switch(sceneManager){
        case 0:
            title.update();
            break;
        case 1:
            soloGame.update();
            break;
        case 2:
            soloGameOver.update();
            break;
    }
    press_key = null;
}

function main(){
    update();
    draw();
    requestAnimationFrame(main);
}

init();