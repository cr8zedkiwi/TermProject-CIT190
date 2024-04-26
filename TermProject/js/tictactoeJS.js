let numPlays = 0;
let gameFinished = false;
let currentPlayer = 'GreenApple';
let currentPlays = {
    GreenApple: [],
    Cherry: []
}
let scores = {
    GreenApple:[],
    Cherry:[]
}
const Images = {
    GreenApple: 'media/appleRancher.jpg',
    Cherry: 'media/cherryRancher.jpg',
}
const winningPositions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

$(document).ready(function (){
    $('.square').on('click', function(){
        if (!gameFinished && !$(this).html()){
        numPlays++
        let $img = $('<img>');
        $img.attr('src', Images[currentPlayer]);
        $(this).html($img);
        currentPlays[currentPlayer].push(parseInt($(this).attr('data-index')));

        if (isWinner()) {
            showGameResult('win');
            updateScore(currentPlayer);
        }

        if (!gameFinished && isTie()){
            showGameResult('Tie');
        }
        currentPlayer = (currentPlayer === 'GreenApple') ? 'Cherry' : 'GreenApple';
        }
    });
});

$(document).ready(function (){
    $('#playAgain').on('click', function(){
        playAgain();
    })
})

function playAgain(){
    numPlays = 0;
    gameFinished = false;
    currentPlayer = 'GreenApple';
    currentPlays = {
        GreenApple: [],
        Cherry: []
    };
    $('.square').empty();

    $("#gameResult").text('');

    $("#currentPlayer").text('Current Player: ' + currentPlayer);
}

function showGameResult(type){
    gameFinished = true;
    if (type === 'win'){
        $("#gameResult").text('Winner is ' + currentPlayer);
    } else{
        $("#gameResult").text('We Have A Tie!');
    }
}

function isTie(){
    return numPlays === 9;
}

function isWinner(){

    for (let i = 0; i < winningPositions.length; i++){
        let isWinner = true;

        for (let j = 0; j < winningPositions[i].length; j++){
        if ($.inArray(winningPositions[i][j], currentPlays[currentPlayer]) < 0){
            isWinner = false;
            break;
        }
    }

    if (isWinner)
        return true;
    }


    return false;
    }
    function updateScore(player){
        scores[player]++;
        let $scoreParagraph = $("#score" + player);
        $scoreParagraph.text(player + ": " + scores[player]);
    }
