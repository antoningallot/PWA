let ball = { x : 0, y : 0, width: 20, height: 20, speed_x : 0, speed_y : 0, display : null };
let player1 = { score: 0, x : 0, y : 0, width: 20, height: 140, display: null };
let player2 = { score: 0, x : 0, y : 0, width: 20, height: 140, display: null };
let wall1 = { x : 0, y : 0, width: 1000, height : 20, display: null };
let wall2 = { x : 0, y : 0, width: 1000, height : 20, display: null };
let to_play = 0;

let init_ball = function () {
    /* A COMPLÉTER QUESTION 3 */
    ball.x = 120;
    ball.y = 290;
    ball.display = document.getElementById("ball");
};

init_ball();

let init_players = function () {
    /* A COMPLÉTER QUESTION 5 */
    player1.x = 80;
    player1.y = 230;
    player1.display = document.getElementById("player1");
    player2.x = 900;
    player2.y = 230;
    player2.display = document.getElementById("player2");   
}

init_players();

let init_walls = function () {
    /* A COMPLÉTER QUESTION 5 */
    wall1.x = 0;
    wall1.y = 0;
    wall1.display = document.getElementById("wall1");
    wall2.x = 0;
    wall2.y = 580;
    wall2.display = document.getElementById("wall2");
}

init_walls();

let draw = function (o) {
    /* A COMPLÉTER QUESTION 6 */
    o.display.style.left = (o.x).toString() + "px";
    o.display.style.top = (o.y).toString() + "px";
    o.display.style.width = (o.width).toString() + "px";
    o.display.style.height = (o.height).toString() + "px";
    
}

draw(ball);
draw(player1);
draw(player2);
draw(wall1);
draw(wall2);

let keyboard = function (e) {
    /* A COMPLÉTER QUESTION 7 et 12 */
    if(e.keyCode === 69){
        if (player1.y > 10) { player1.y = player1.y - 10 }
    }
    if(e.keyCode === 68){
        if (player1.y < 590) { player1.y = player1.y + 10 }
    }
    if(e.keyCode === 79){
        if (player2.y > 10) { player2.y = player2.y - 10 }
    }
    if(e.keyCode === 76){
        if (player2.y < 590) { player2.y = player2.y + 10 }
    }
    if(e.keyCode === 72){
        launch();
    }
};

document.addEventListener("keydown", keyboard);

let update = function () {
    /* À COMPLÉTER QUESTION 8, 11 */
    let result = update_ball();
    if (result !== 0) { 
        ball.speed_x = 0;
        ball.speed_y = 0;
        init_players();
        if (result === 1){
            player1.score++;
            to_play = 2;
            ball.x = player2.x - ball.width - 5;
            ball.y = player2.y + player2.height/2 - ball.height/2;
        }
        else {
            player2.score++;
            to_play = 1;
            ball.x = player1.x + player1.width + 5;
            ball.y = player1.y + player1.height/2 - ball.height/2;
        }
    }
    draw(ball);
    draw(player1);
    draw(player2);
    draw(wall1);
    draw(wall2);
};

setInterval(update, 17);

let update_ball = function () {
    /* À COMPLÉTER QUESTION 9, 10 */
    ball.x = ball.x + ball.speed_x;
    ball.y = ball.y + ball.speed_y;
    if (ball.y <= wall1.y + wall1.height || ball.y + ball.height >= wall2.y) {
        ball.speed_y = -ball.speed_y;
    }
    if (ball.x <= player1.x + player1.width){
        if (ball.y + ball.height/2 >= player1.y && ball.y + ball.height/2 <= player1.y + player1.height){
            ball.speed_x = -ball.speed_x;
        }
        else { return 2; }
    }
    if(ball.x + ball.width >= player2.x){
        if (ball.y + ball.height/2 >= player2.y && ball.y + ball.height/2 <= player2.y + player2.height){
            ball.speed_x = -ball.speed_x;
        }
        else { return 1; }
    }
    return 0;
};

let launch = function () {
    /* À COMPLÉTER QUESTION 12 */
    let teta = ((2 * Math.random())-1) * Math.PI/3;
    let r = 5;
    ball.speed_y = r * Math.sin(teta);
    if(to_play === 1 || to_play === 0) { 
        ball.speed_x = r * Math.cos(teta);
    }
    else { ball.speed_x = -r * Math.cos(teta); }
}