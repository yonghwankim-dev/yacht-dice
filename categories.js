function calAces() {
  let score = 0;
  let user__score = null;

  selected__dices.forEach((d) =>
    Number(d.textContent) === 1 ? (score += 1) : d
  );

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[0].textContent === "") {
    user__score[0].textContent = score;
  }
}

function calDoubles() {
  let score = 0;
  let user__score = null;

  selected__dices.forEach((d) =>
    Number(d.textContent) === 2 ? (score += 2) : d
  );

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[1].textContent === "") {
    user__score[1].textContent = score;
  }
}

function calThrees() {
  let score = 0;
  let user__score = null;

  selected__dices.forEach((d) =>
    Number(d.textContent) === 3 ? (score += 3) : d
  );

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[2].textContent === "") {
    user__score[2].textContent = score;
  }
}

function calFours() {
  let score = 0;
  let user__score = null;

  selected__dices.forEach((d) =>
    Number(d.textContent) === 4 ? (score += 4) : d
  );

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[3].textContent === "") {
    user__score[3].textContent = score;
  }
}

function calFives() {
  let score = 0;
  let user__score = null;

  selected__dices.forEach((d) =>
    Number(d.textContent) === 5 ? (score += 5) : d
  );

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[4].textContent === "") {
    user__score[4].textContent = score;
  }
}

function calSixes() {
  let score = 0;
  let user__score = null;

  selected__dices.forEach((d) =>
    Number(d.textContent) === 6 ? (score += 6) : d
  );

  if (user.textContent === "user1") {
    user__score = user1__score;
  } else {
    user__score = user2__score;
  }

  if (user__score[5].textContent === "") {
    user__score[5].textContent = score;
  }
}

