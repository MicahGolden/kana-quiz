// declare variables for each element in your HTML
const headerBox = document.querySelector('.header-box');
const questionNo = document.getElementById("question-number");
const toBeGuessed = document.getElementById('to-be-guessed');
const guessButtons = document.querySelectorAll('.button');
const guessGrid = document.getElementById("guess-grid");
const typeOne = document.getElementById("game-1");
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
let currentRomaji = "";

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
};


const checkAnswer = (button) => {
  if (button.innerText === hiraganaToRomaji[currentHiragana]) {
    // code to run if the answer is correct
    correctSound.play();
    score ++;
    streak ++;
    nextQuestion();
  } else {
    // code to run if the answer is incorrect
    incorrectSound.play();
    streak = 0;
    nextQuestion();
  }
}

const startType1 = () => {
  guessGrid.style.display = "grid";
  gameTypeButtons.style.display = "none";
  nextQuestion();
}

const nextQuestion = () => {
  gameEnd();
  scoreBox.innerText = `Score: ${score}`;
  streakBox.innerText = `🔥: ${streak}`;
  let randomIndex = Math.floor(Math.random() * hiraganaArray.length);
  currentHiragana = hiraganaArray.splice(randomIndex, 1)[0];
  shuffleArray();
  toBeGuessed.innerText = `${currentHiragana}`;
  box1.innerText = `${box1AnsT1}`;
  box2.innerText = `${box2AnsT1}`;
  box3.innerText = `${box3AnsT1}`;
  box4.innerText = `${box4AnsT1}`;
  toBeGuessed.innerText = `${currentHiragana}`
  questionNo.innerText = `Question ${qNumber+1}/46`;
  qNumber += 1;
}

//Button Events
typeOne.addEventListener("click", startType1);
guessButtons.forEach((button) => {
  button.addEventListener("click", () => {
    checkAnswer(button);
  });
});
