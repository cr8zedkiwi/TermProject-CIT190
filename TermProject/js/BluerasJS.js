var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    //declaring all sizes and colors of score and character
    myGamePiece = new component(80, 80, "media/jolly rancher.png", 10, 120, "image");
    myScore = new component("30px", "Consolas", "rgb(0,208,255, 1)", 60, 40, "text");
    myHighScore = new component("30px", "Consolas", "rgb(0,208,255, 1)", 370, 40, "text");
    myGameArea.start();
}
//creating game board
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 680;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
//filling components with image and color
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
        } 

    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
        }  
        else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillText(this.text, this.x, this.y);

        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

//condition to check if player collides with obstacles
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }

    //condition to check if player went out of bounds
    if (myGamePiece.x < 0 || myGamePiece.x > myGameArea.canvas.width ||
        myGamePiece.y < 0 || myGamePiece.y > myGameArea.canvas.height) {
            myGameArea.stop();
            alert("You Went Out Of Bounds");
            return;
        
    }
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(45)) {
        x = myGameArea.canvas.width;
        minHeight = 0;
        maxHeight = 570;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 170;
        maxGap = 220;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(30, height, "black", x, 0));
        myObstacles.push(new component(30, x - height - gap, "black", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -8;
        myObstacles[i].update();
    }
    //adjust speeds of character and their direction witht the keys
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -8; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 8; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -8; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 8; }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myHighScore.text = "Personal High Score: " + highScore(myGameArea.frameNo);
    myScore.update();
    myHighScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
//displays highscore
function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
       try { score = parseFloat(score); } catch (e) { score = 0; }
       if (score>saved) {
         saved = score;
         localStorage.highScore = '' + score;
       }
    }
    if (isNaN(saved)) {
       saved = 0;
       localStorage.highScore = '0';
    }
    return saved;
 }