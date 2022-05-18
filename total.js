/* 
title : 사용자의 점수를 계산하고 기록
author : 김용환(dragonbead95@naver.com)
date : 2020-08-28
detail :
*/

const user1_subTotal = document.querySelector(".subtotal__score__user1");
const user2_subTotal = document.querySelector(".subtotal__score__user2");
const user1_totalScore = document.querySelector(".total__score__user1");
const user2_totalScore = document.querySelector(".total__score__user2");
const user1_bonus = document.querySelector(".score__bonus__user1");
const user2_bonus = document.querySelector(".score__bonus__user2");

function cal_subtotal() {
  let sum_subtotal = 0;
  let dice_score = null;
  let user_subtotal = null;

  if (user.textContent === "user1") {
    dice_score = user1_dice_score;
    user_subtotal = user1_subTotal;
  } else {
    dice_score = user2_dice_score;
    user_subtotal = user2_subTotal;
  }

  for (let i = 0; i < 6; i++) {
    if (dice_score[i] !== -1) {
      sum_subtotal += dice_score[i];
    }
  }

  user_subtotal.textContent = sum_subtotal;
}

function isBonus() {
  let user_subtotal = null;
  let user_bonus = null;
  if (user.textContent === "user1") {
    user_subtotal = user1_subTotal;
    user_bonus = user1_bonus;
  } else {
    user_subtotal = user2_subTotal;
    user_bonus = user2_bonus;
  }

  if (Number(user_subtotal.textContent) > 63) {
    user_bonus.textContent = Number(user_subtotal.textContent);
  }
}

function cal_totalScore() {
  let sum_total = 0;
  let user_subtotal = null;
  let user_total = null;
  let dice_score = null;
  let user_bonus = null;

  if (user.textContent === "user1") {
    dice_score = user1_dice_score;
    user_bonus = user1_bonus;
    user_total = user1_totalScore;
  } else {
    dice_score = user2_dice_score;
    user_bonus = user2_bonus;
    user_total = user2_totalScore;
  }

  for (let i = 0; i < 12; i++) {
    if (dice_score[i] !== -1) {
      sum_total += dice_score[i];
    }
  }

  user_total.textContent =
    user_subtotal + Number(user_bonus.textContent) + sum_total;
}
