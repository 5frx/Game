var playspace = document.getElementById('playspace');
var display = playspace.getContext('2d');
var playspace_d = 400;
var playspace_w = 300;
var playspace_h = 150;

var pi = 3.14159265359;

var initial_v = 2;
var initial_a = (Math.random() * (3.92699081699 - 2.35619449019))+2.35619449019;
var a = initial_a;
console.log(initial_a);
var a_bottom = pi - pi/2 - initial_a;
var a_right = 6.28318530718 - 4.71238898038 + a_bottom;
var a_top = 6.28318530718 - 4.71238898038 + a_right;
var a_left = 6.28318530718 - 4.71238898038 + a_top;

var board_h = 25;
var board_w = 4;
var board_y = 75 - board_h/2;
var board_x = 6;

var ball_w = board_w*2;
var ball_h = board_w;
var ball_x = board_x + 10;
var ball_y = 75 - ball_h/2;

var up = 38;
var down = 40;
var space = 32;

window.addEventListener('load',start);
window.addEventListener('keydown',onPress);

function start(){
  draw_board();
  draw_ball();
}

function update(){
  draw_board();
  draw_ball();
}

function draw_board(){
  display.clearRect(0,0,300,150);
  display.fillStyle = 'white';
  display.fillRect(board_x,board_y,board_w,board_h);
}

function draw_ball(){
  display.fillRect(ball_x,ball_y,ball_w,ball_h);
}

var over_top = false;
var over_bottom = false;
var start = false;

function onPress(){
  if (board_y < 3){
    over_top = true;
  } else if (board_y > 122){
    over_bottom = true;
  } else {
    over_top = false;
    over_bottom = false;
  }

  if (over_top == false){
    if (event.keyCode == up){
      board_y -= 5;
      if(start == false){
        ball_y -= 5;
      }
      update();
    }
  }
  if (over_bottom == false){
     if (event.keyCode == down) {
        board_y += 5;
        if(start == false){
          ball_y += 5;
        }
        update();
      }
  }
  if (event.keyCode == space) {
    start = true;
    ballMotion();
  }
}

function reset(){
  initial_v = 2;
  initial_a = (Math.random() * (3.92699081699 - 2.35619449019))+2.35619449019;
  a = initial_a;
  console.log(initial_a);
  a_bottom = pi - pi/2 - initial_a;
  a_right = 6.28318530718 - 4.71238898038 + a_bottom;
  a_top = 6.28318530718 - 4.71238898038 + a_right;
  a_left = 6.28318530718 - 4.71238898038 + a_top;

  board_h = 25;
  board_w = 4;
  board_y = 75 - board_h/2;
  board_x = 6;

  ball_w = board_w*2;
  ball_h = board_w;
  ball_x = board_x + 10;
  ball_y = 75 - ball_h/2;
  window.cancelAnimationFrame(ballMotion);
}

function checkIn() {
  if (ball_y < board_y || ball_y > board_h ){
    reset();
  }
}

function ballMotion() {

  if (ball_y > 149 - ball_h){
    console.log(a_bottom);
    a_bottom = pi - pi/2 - initial_a + pi/4;
    a = a_bottom;
    ball_y += (Math.sin(a)*initial_v)/2;
    ball_x += -Math.cos(a)*initial_v;
  } else if(ball_x > 300 - ball_w){
    console.log(a_right);
    a_right = initial_a - pi + pi/4;
    a = a_right
    ball_y += (Math.sin(a)*initial_v)/2;
    ball_x += -Math.cos(a)*initial_v;
  } else if(ball_y < 0){

    console.log(initial_a);
    a_top = a_bottom - pi;
    a = a_top
    ball_y += (Math.sin(a)*initial_v)/2;
    ball_x += -Math.cos(a)*initial_v;
  } else if(ball_x < board_x + board_w){

    console.log(initial_a);
    a_left = (Math.random() * (3.92699081699 - 2.35619449019))+2.35619449019;
    a = a_left;
    ball_y += (Math.sin(a)*initial_v)/2;
    ball_x += -Math.cos(a)*initial_v;
    checkIn();
  } else{
    ball_y += (Math.sin(a)*initial_v)/2;
    ball_x += -Math.cos(a)*initial_v;
  }
  update();
  window.requestAnimationFrame(ballMotion);
}
