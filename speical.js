/* 
title : 스페셜 점수를 기록한다.
author : 김용환(dragonbead95@naver.com)
date : 2020-08-28
detail :

user1_score, index 6~11 => choice~Yacht

speical 점수 규칙
choice : 주사위 5개 눈의 총합
4 of a kind : 주사위 4개 이상의 눈이 동일할때 주사위 5개의 합
full house : 눈이 동일한 주사위가 각각 3개와 2개가 있을 때, 고정 25점
S. Stright : 주사위 4개 이상의 눈이 이어지는 수일 때, 고정 30점
L. Stright : 주사위 5개의 눈이 이어지는 수일 때, 고정 40점
Yacht : 주사위 5개의 눈이 모두 같을 때, 고정 50점

reference : https://namu.wiki/w/%EC%95%BC%EC%B0%8C
*/

function cal_choice() {
  let score = 0;
  let user__score = null;
  selected__dices.forEach((d) => {
    score += Number(d.textContent);
  });

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[6].textContent === "") {
    user__score[6].textContent = score;
  }
}

function cal_FourOfaKind() {
  let score = 0;
  if (check()) {
    selected__dices.forEach((item) => {
      score += Number(item.textContent);
    });
  } else {
    score = 0;
  }

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[7].textContent === "") {
    user__score[7].textContent = score;
  }

  function check() {
    sd = [];
    count = [0, 0, 0, 0, 0, 0, 0]; // 리스트에 숫자 개수 저장 리스트, index 0은 더미
    //선택된 다이스들을 리스트에 정수형으로 저장
    selected__dices.forEach((item) => {
      sd.push(Number(item.textContent));
    });

    for (let i = 0; i < sd.length; i++) {
      count[sd[i]]++;
    }

    //최대값과 최대값의 인덱스 찾기
    let max = -1;
    let max_idx = 0;
    for (let i = 1; i < count.length; i++) {
      if (count[i] > max) {
        max = count[i];
        max_idx = i;
      }
    }

    if (max >= 4) {
      return true;
    } else {
      return false;
    }
  }
}

function cal_FullHouse() {
  let score = 0;
  if (check()) {
    score = 25;
  }

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[8].textContent === "") {
    user__score[8].textContent = score;
  }

  function check() {
    sd = [];
    count = [0, 0, 0, 0, 0, 0, 0]; // 리스트에 숫자 개수 저장 리스트, index 0은 더미
    //선택된 다이스들을 리스트에 정수형으로 저장
    selected__dices.forEach((item) => {
      sd.push(Number(item.textContent));
    });

    for (let i = 0; i < sd.length; i++) {
      count[sd[i]]++;
    }

    //주사위의 눈이 2개와 3개인지 검사
    if (count.includes(2, 1) && count.includes(3, 1)) {
      return true;
    } else {
      return false;
    }
  }
}

function cal_Sstright() {
  let score = 0;
  if (check()) {
    score = 30;
  }

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[9].textContent === "") {
    user__score[9].textContent = score;
  }

  function check() {
    sd = [];
    //선택된 다이스들을 리스트에 정수형으로 저장
    selected__dices.forEach((item) => {
      sd.push(Number(item.textContent));
    });
    sd.sort();
    if (check_stright(sd, 4)) {
      return true;
    } else {
      return false;
    }
  }
}

function cal_LStright() {
  let score = 0;
  if (check()) {
    score = 40;
  }

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[10].textContent === "") {
    user__score[10].textContent = score;
  }

  function check() {
    sd = [];
    //선택된 다이스들을 리스트에 정수형으로 저장
    selected__dices.forEach((item) => {
      sd.push(Number(item.textContent));
    });
    sd.sort();
    if (check_stright(sd, 5)) {
      return true;
    } else {
      return false;
    }
  }
}

// n stright인지 검사한다.
function check_stright(sd, n) {
  const set = [...new Set(sd)]; //중복된 수를 제거한 집합
  console.log(set);
  if (set.length < n) {
    //주사위 집합이 4개 미만이면 스몰스트레이트를 만들 수 없다.
    return false;
  } else {
    for (let i = 0; i < set.length; i++) {
      let count = 1;
      if (i + n > set.length) {
        return false;
      } else {
        for (let j = i; j < i + n; j++) {
          if (set[j] === set[j + 1] - 1) {
            count++;
          }
        }
        if (count >= 4) {
          return true;
        }
      }
    }
    return false;
  }
}

function cal_Yacht() {
  let score = 0;
  if (check()) {
    score = 50;
  }

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[11].textContent === "") {
    user__score[11].textContent = score;
  }

  function check() {
    sd = [];
    count = [0, 0, 0, 0, 0, 0, 0]; // 리스트에 숫자 개수 저장 리스트, index 0은 더미
    //선택된 다이스들을 리스트에 정수형으로 저장
    selected__dices.forEach((item) => {
      sd.push(Number(item.textContent));
    });

    for (let i = 0; i < sd.length; i++) {
      count[sd[i]]++;
    }

    if (count.includes(5, 0)) {
      return true;
    } else {
      return false;
    }
  }
}
