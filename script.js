/* 
title : yacht dice
author : 김용환(dragonbead95@naver.com)
date : 2020-08-28
detail :
todo : 1. left가 0이 되는 순간 roll__dice들은 자동으로 선택되어져야 한다.
      
*/

const roll_btn = document.querySelector(".roll_btn"); // 주사위 굴리는 버튼
const roll__dice = document.querySelectorAll(".roll__dice"); // 주사위 굴리고 나온 수들
const choice__dices = document.querySelectorAll(".choice__dice"); // 주사위 추가 선택 버튼
const selected__dices = document.querySelectorAll(".selected__dice"); // 선택된 주사위 수
const remove__dices = document.querySelectorAll(".remove__dice"); // 주사위 제거 선택 버튼
const leave__turn = document.querySelector(".leave-turn"); // 남은턴 텍스트
const user = document.querySelector(".user"); // 현재 턴 사용자 텍스트
const user1__score = document.querySelectorAll(".user1__score"); // 사용자1 주사위 점수
const user2__score = document.querySelectorAll(".user2__score"); // 사용자2 주사위 점수
const score__turn__number = document.querySelector(".score__turn__number"); // 현재 턴 텍스트

let roll_dice_status = [false, false, false, false, false]; // 굴린 주사위 상황, true:선택됨, false:선택안됨
let selected_dices_status = [false, false, false, false, false]; // 선택된 주사위 상황, true:선택됨, false:선택안됨

let user1_dice_score = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; // Aces, Douces, Threes, Fours, Fives, Sixes,choice, 4 of a kind, Full House, S. Straight, L. Straight, Yacht
let user1_total_score = [0, 0, 0]; // subtotal, 35bonus, total

let user2_dice_score = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; // Aces, Douces, Threes, Fours, Fives, Sixes,choice, 4 of a kind, Full House, S. Straight, L. Straight, Yacht
let user2_total_score = [0, 0, 0]; // subtotal, 35bonus, total

let turn = 1; // 현재 턴 변수

/*주사위를 굴림 */
function roll() {
  let dices = [];
  let roll_count = 0;

  // 굴려야할 주사위 횟수를 구한다.
  for (let i = 0; i < 5; i++) {
    if (selected__dices[i].textContent === "") {
      roll_count++;
    }
  }

  // 1~6사이의 난수 생성
  for (let i = 0; i < roll_count; i++) {
    dices.push(Math.floor(Math.random() * 6 + 1));
  }

  // roll_dice_status 배열에서 false인 자리에만 주사위 눈을 넣는다.
  for (let i = 0; i < 5; i++) {
    if (roll_dice_status[i]) {
      continue;
    }
    roll__dice[i].textContent = dices.pop();
    choice__dices[i].style.visibility = "visible";
  }

  /*turn을 감소한다. */
  curr_turn = Number(leave__turn.textContent) - 1;
  if (curr_turn < 0) {
    user_turnOver();
    curr_turn = 3;
  }
  leave__turn.textContent = String(curr_turn);
}

/*주사위를 선택하여 추가한다. */
function add() {
  const idx = this.name;
  selected__dices[idx].textContent = roll__dice[idx].textContent;
  roll__dice[idx].textContent = "";
  choice__dices[idx].style.visibility = "hidden";
  remove__dices[idx].style.visibility = "visible";

  roll_dice_status[idx] = true;
  selected_dices_status[idx] = true;

  //6개 전부 선택되었다면 점수를 선택한다.
  if (isfull_Selected()) {
    calAces();
    calDoubles();
    calThrees();
    calFours();
    calFives();
    calSixes();

    cal_choice();
    cal_FourOfaKind();
    cal_FullHouse();
    cal_Sstright();
    cal_LStright();
    cal_Yacht();
  }
}
/*선택된 주사위를 제거 버튼을 클릭하여 제거한다. */
function remove() {
  const idx = this.name;
  roll__dice[idx].textContent = selected__dices[idx].textContent;
  selected__dices[idx].textContent = "";
  choice__dices[idx].style.visibility = "visible";
  remove__dices[idx].style.visibility = "hidden";

  roll_dice_status[idx] = false;
  selected_dices_status[idx] = false;

  if (!isfull_Selected()) {
    if (user.textContent === "user1") {
      user1__score.forEach((u) => (u.textContent = ""));
    } else {
      user2__score.forEach((u) => (u.textContent = ""));
    }
  }
}

function user_turnOver() {
  let user_score = null;
  let dice_score = null;
  roll_dice_status = [false, false, false, false, false];
  selected_dices_status = [false, false, false, false, false];

  for (let i = 0; i < 5; i++) {
    roll__dice[i].textContent = "";
    selected__dices[i].textContent = "";
    choice__dices[i].style.visibility = "hidden";
    remove__dices[i].style.visibility = "hidden";
  }

  // user1 -> user2, user2->user1, 턴교대
  if (user.textContent === "user1") {
    user.textContent = "user2";
    user_score = user1__score;
    dice_score = user1_dice_score;
  } else {
    turn++; //user2가 턴을 종료하였으므로 턴 증가
    score__turn__number.textContent = turn;
    user.textContent = "user1";
    user_score = user2__score;
    dice_score = user2_dice_score;
  }

  let idx = 0;
  dice_score.forEach((item) => {
    if (item == -1) {
      user_score[idx].textContent = "";
    }
    idx++;
  });

  leave__turn.textContent = 3; //턴 종료시 횟수 3으로 초기화

  if (turn === 12) {
    game_reset();
  }
}

function game_reset() {
  roll_dice_status = [false, false, false, false, false];
  selected_dices_status = [false, false, false, false, false];

  user1_dice_score = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; // Aces, Douces, Threes, Fours, Fives, Sixes,choice, 4 of a kind, Full House, S. Straight, L. Straight, Yacht
  user1_total_score = [0, 0, 0]; // subtotal, 35bonus, total

  user2_dice_score = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; // Aces, Douces, Threes, Fours, Fives, Sixes,choice, 4 of a kind, Full House, S. Straight, L. Straight, Yacht
  user2_total_score = [0, 0, 0]; // subtotal, 35bonus, total

  turn = 1;
  score__turn__number.textContent = 1;
  user.textContent = "user1";
  leave__turn.textContent = 3;

  user1__score.forEach((item) => {
    item.textContent = "";
  });
  user2__score.forEach((item) => {
    item.textContent = "";
  });

  user1_subTotal.textContent = 0;
  user1_totalScore.textContent = 0;
  user2_subTotal.textContent = 0;
  user2_totalScore.textContent = 0;
}

function isfull_Selected() {
  let counter = 0;
  selected_dices_status.forEach((v) => (v ? counter++ : v));

  if (counter === 5) {
    return true;
  } else {
    return false;
  }
}

//점수를 선택한다.
//todo : span(user1__score)의 인덱스를 구해야함

function choice_score() {
  let idx = 0;
  let score = null;
  let dice_score = null;

  if (user.textContent == "user1") {
    score = user1__score;
    dice_score = user1_dice_score;
  } else {
    score = user2__score;
    dice_score = user2_dice_score;
  }

  score.forEach((item) => {
    if (item == this) {
      item.style.opacity = "1.0";
      dice_score[idx] = Number(item.textContent);
    }
    idx++;
  });

  idx = 0;
  dice_score.forEach((item) => {
    if (item === -1) {
      score[idx].textContent = "";
    }
    idx++;
  });

  cal_subtotal();
  isBonus();
  cal_totalScore();
  user_turnOver();
}

roll_btn.addEventListener("click", roll);
choice__dices.forEach((item) => {
  item.addEventListener("click", add);
});

remove__dices.forEach((item) => {
  item.addEventListener("click", remove);
});

user1__score.forEach((item) => {
  item.addEventListener("click", choice_score);
});

user2__score.forEach((item) => {
  item.addEventListener("click", choice_score);
});
