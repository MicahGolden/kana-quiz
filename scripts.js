// declare variables for each element in your HTML
const headerBox = document.querySelector('.header-box');
const questionNo = document.getElementById("question-number");
const toBeGuessed = document.getElementById('to-be-guessed');
const guessButtons = document.querySelectorAll('.button');
const guessGrid = document.getElementById("guess-grid");
const typeOne = document.getElementById("game-1");
const typeTwo = document.getElementById("game-2");
const gameTypeButtons = document.getElementById("which-game");
const box1 = document.querySelector('#box-1');
const box2 = document.querySelector('#box-2');
const box3 = document.querySelector('#box-3');
const box4 = document.querySelector('#box-4');
const scoreBox = document.getElementById('score');
const streakBox = document.getElementById('streak');
const endCardDiv = document.getElementById('end-card');
const finalScoreMe = document.getElementById('final-score-message');
const scoreMessage = document.getElementById('final-message');
let gameType = 0;
const hiraganaArray = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
  "は", "ひ", "ふ", "へ", "ほ",
  "ま", "み", "む", "め", "も",
  "や",       "ゆ",       "よ",
  "ら", "り", "る", "れ", "ろ",
  "わ",             "を", "ん"
];
const romajiArray = [
  "a", "i", "u", "e", "o",
  "ka", "ki", "ku", "ke", "ko",
  "sa", "shi", "su", "se", "so",
  "ta", "chi", "tsu", "te", "to",
  "na", "ni", "nu", "ne", "no",
  "ha", "hi", "fu", "he", "ho",
  "ma", "mi", "mu", "me", "mo",
  "ya",       "yu",       "yo",
  "ra", "ri", "ru", "re", "ro",
  "wa",             "wo", "n"
];

const hiraganaToRomaji = {
  あ: "a",
  い: "i",
  う: "u",
  え: "e",
  お: "o",
  か: "ka",
  き: "ki",
  く: "ku",
  け: "ke",
  こ: "ko",
  さ: "sa",
  し: "shi",
  す: "su",
  せ: "se",
  そ: "so",
  た: "ta",
  ち: "chi",
  つ: "tsu",
  て: "te",
  と: "to",
  な: "na",
  に: "ni",
  ぬ: "nu",
  ね: "ne",
  の: "no",
  は: "ha",
  ひ: "hi",
  ふ: "fu",
  へ: "he",
  ほ: "ho",
  ま: "ma",
  み: "mi",
  む: "mu",
  め: "me",
  も: "mo",
  や: "ya",
  ゆ: "yu",
  よ: "yo",
  ら: "ra",
  り: "ri",
  る: "ru",
  れ: "re",
  ろ: "ro",
  わ: "wa",
  を: "wo",
  ん: "n",
};

const romajiToHiragana = {
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",
  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
  sa: "さ",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",
  ta: "た",
  chi: "ち",
  tsu: "つ",
  te: "て",
  to: "と",
  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
  ha: "は",
  hi: "ひ",
  fu: "ふ",
  he: "へ",
  ho: "ほ",
  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
  ya: "や",
  yu: "ゆ",
  yo: "よ",
  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
  wa: "わ",
  wo: "を",
  n: "ん",
};


// Game Variables FOR TYPE 1
let box1AnsT1 = "";
let box2AnsT1 = "";
let box3AnsT1 = "";
let box4AnsT1 = "";
let currentHiragana = ``;

// Game Variables FOR TYPE 2
let box1AnsT2 = "";
let box2AnsT2 = "";
let box3AnsT2 = "";
let box4AnsT2 = "";
let currentRomaji = ``;

// Universal Game Variables
let qNumber = 0;
let score = 0;
let streak = 0;
const correctSound = new Audio("correct.mp3");
const incorrectSound = new Audio("incorrect.mp3");
const currentBoxesArray = [];
//Functions

const gameEnd = () => {
  if (qNumber === 46){
    guessGrid.style.display = "none";
    gameTypeButtons.style.display = "none";
    endCardDiv.style.display = "flex";
    finalScoreMe.innerText = `Final Score: ${score}`;
    if (score < 12){
      scoreMessage.innerText = `Make sure to study!`;
    }
    if (score > 12){
      scoreMessage.innerText = `Not bad, but try to learn more!`;
    }
    if (score > 24){
      scoreMessage.innerText = `Good Effort!`;
    }
    if (score > 34){
      scoreMessage.innerText = `Awesome Job!`;
    }
    if (score > 40){
      scoreMessage.innerText = `Excellent!`;
    }
    if (score > 45){
      scoreMessage.innerText = `Perfect!`;
    }
  }
}
const shuffleArray = () => {
  if (gameType === 1){ //Game Type 1 Shuffle
    const currentRomaji = hiraganaToRomaji[currentHiragana];
    const currentBoxesArray = [currentRomaji];
    while (currentBoxesArray.length < 4) {
      const randomIndex = Math.floor(Math.random() * romajiArray.length);
      const randomRomaji = romajiArray[randomIndex];
      if (!currentBoxesArray.includes(randomRomaji)) {
        currentBoxesArray.push(randomRomaji);
      }
    }
    const shuffledArray = [];
    while (currentBoxesArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentBoxesArray.length);
      const randomChoice = currentBoxesArray.splice(randomIndex, 1)[0];
      shuffledArray.push(randomChoice);
    }
    box1AnsT1 = shuffledArray[0];
    box2AnsT1 = shuffledArray[1];
    box3AnsT1 = shuffledArray[2];
    box4AnsT1 = shuffledArray[3];
  }
  if (gameType === 2){ //Game Type 2 Shuffle
    const currentHiragana = romajiToHiragana[currentRomaji];
    const currentBoxesArray = [currentHiragana];
    while (currentBoxesArray.length < 4) {
      const randomIndex = Math.floor(Math.random() * hiraganaArray.length);
      const randomHiragana = hiraganaArray[randomIndex];
      if (!currentBoxesArray.includes(randomHiragana)) {
        currentBoxesArray.push(randomHiragana);
      }
    }
    const shuffledArray = [];
    while (currentBoxesArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentBoxesArray.length);
      const randomChoice = currentBoxesArray.splice(randomIndex, 1)[0]; //ISSUE MAY STEM FROM HERE, KEY NOT BEING READ?
      shuffledArray.push(randomChoice);
    }
    box1AnsT2 = shuffledArray[0];
    box2AnsT2 = shuffledArray[1];
    box3AnsT2 = shuffledArray[2];
    box4AnsT2 = shuffledArray[3];
  }
};


const checkAnswer = (button) => {
  if (gameType === 1){
    if (button.innerText === hiraganaToRomaji[currentHiragana]) {
      correctSound.play();
      score ++;
      streak ++;
      toBeGuessed.innerText = "Correct!";
      setTimeout(() => {
        nextQuestion1();
      }, 1000);
    } else {
      incorrectSound.play();
      streak = 0;
      toBeGuessed.innerText = `Wrong! The correct answer was ${hiraganaToRomaji[currentHiragana]}.`;
      setTimeout(() => {
        nextQuestion1();
      }, 1000);
    }
  }
  if (gameType === 2){
    if (button.innerText === romajiToHiragana[currentRomaji]) {
      correctSound.play();
      score ++;
      streak ++;
      toBeGuessed.innerText = "Correct!";
      setTimeout(() => {
        nextQuestion1();
      }, 1000);
    } else {
      incorrectSound.play();
      streak = 0;
      toBeGuessed.innerText = `Wrong! The correct answer was ${hiraganaToRomaji[currentRomaji]}.`;
      setTimeout(() => {
        nextQuestion1();
      }, 1000);
    }
  }
}


const startType1 = () => {
  gameType = 1;
  guessGrid.style.display = "grid";
  gameTypeButtons.style.display = "none";
  nextQuestion1();
}

const startType2 = () => {
  gameType = 2;
  guessGrid.style.display = "grid";
  gameTypeButtons.style.display = "none";
  nextQuestion1();
}

const nextQuestion1 = () => {
  gameEnd();
  scoreBox.innerText = `Score: ${score}`;
  streakBox.innerText = `🔥: ${streak}`;
  if (gameType === 1){
    let randomIndex = Math.floor(Math.random() * hiraganaArray.length);
    currentHiragana = hiraganaArray.splice(randomIndex, 1)[0];
    shuffleArray();
    toBeGuessed.innerText = `${currentHiragana}`;
    box1.innerText = `${box1AnsT1}`;
    box2.innerText = `${box2AnsT1}`;
    box3.innerText = `${box3AnsT1}`;
    box4.innerText = `${box4AnsT1}`;
    toBeGuessed.innerText = `${currentHiragana}`
  }
  if (gameType === 2){
    let randomIndex = Math.floor(Math.random() * romajiArray.length);
    currentRomaji = romajiArray.splice(randomIndex, 1)[0];
    shuffleArray();
    toBeGuessed.innerText = `${currentRomaji}`;
    box1.innerText = `${box1AnsT2}`;
    box2.innerText = `${box2AnsT2}`;
    box3.innerText = `${box3AnsT2}`;
    box4.innerText = `${box4AnsT2}`;
    toBeGuessed.innerText = `${currentRomaji}`
  }
  questionNo.innerText = `Question ${qNumber+1}/46`;
  qNumber += 1;
}

//Button Events
typeOne.addEventListener("click", startType1);
typeTwo.addEventListener("click", startType2);
guessButtons.forEach((button) => {
  button.addEventListener("click", () => {
    checkAnswer(button);
  });
});
