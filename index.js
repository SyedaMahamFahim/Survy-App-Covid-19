//selecting all required elements
const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const result_box = document.querySelector('.result_box');
const option_list = document.querySelector('.option_list');
const time_line = document.querySelector('header .time_line');
const timeText = document.querySelector('.timer .time_left_txt');
const timeCount = document.querySelector('.timer .timer_sec');

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

const next_btn = document.querySelector('footer .next_btn');
const bottom_ques_counter = document.querySelector('footer .total_que');

let userSelectedOptions = [];

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add('activeInfo'); //show info box
  document.querySelector('.start_btn').style.display = 'none';
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove('activeInfo'); //hide info box
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  
  let userName=document.getElementById('username').value
  if(userName == "" || userName ==undefined || userName==null){
    alert("Kindly, enter the name")
  }else{
    info_box.classList.remove('activeInfo'); //hide info box
  quiz_box.classList.add('activeQuiz'); //show quiz box
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  }
};

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add('activeQuiz'); //show quiz box
  result_box.classList.remove('activeResult'); //hide result box
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  next_btn.classList.remove('show'); //hide the next button
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuetions(que_count);
    queCounter(que_numb);
    next_btn.classList.remove('show');
  } else {
    showResult();
  }
};
var maham = [];
// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector('.que_text');

  let que_tag =
    '<span>' +
    questions[index].numb +
    '. ' +
    questions[index].question +
    '</span>';

  if (
    questions[index].options[2] &&
    questions[index].options[3] !== undefined
  ) {
    let option_tag =
      '<div class="option"><span>' +
      questions[index].options[0] +
      '</span></div>' +
      '<div class="option"><span>' +
      questions[index].options[1] +
      '</span></div>' +
      '<div class="option"><span>' +
      questions[index].options[2] +
      '</span></div>' +
      '<div class="option"><span>' +
      questions[index].options[3] +
      '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
  } else if (
    questions[index].options[2] &&
    questions[index].options[3] === undefined
  ) {
    let option_tag =
      '<div class="option"><span>' +
      questions[index].options[0] +
      '</span></div>' +
      '<div class="option"><span>' +
      questions[index].options[1] +
      '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
  } else if (questions[index].options[2] === undefined) {
    let option_tag =
      '<div class="option"><span>' +
      questions[index].options[0] +
      '</span></div>' +
      '<div class="option"><span>' +
      questions[index].options[1] +
      '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
  } else if (questions[index].options[3] === undefined) {
    let option_tag =
      '<div class="option"><span>' +
      questions[index].options[0] +
      '</span></div>' +
      '<div class="option"><span>' +
      questions[index].options[1] +
      '</span></div>' +
      '<div class="option"><span>' +
      questions[index].options[2] +
      '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
  }

  const option = option_list.querySelectorAll('.option');

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}

//if user clicked on option
function optionSelected(answer) {
  let userAns = answer.textContent; //getting user selected option
  userSelectedOptions.push(userAns);
  //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items
  console.log('useransw', userAns);

  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add('disabled'); //once user select an option then disabled all options
  }
  next_btn.classList.add('show'); //show the next button if user selected any option
}

function showResult() {
  console.log(userSelectedOptions);
  info_box.classList.remove('activeInfo'); //hide info box
  quiz_box.classList.remove('activeQuiz'); //hide quiz box
  result_box.classList.add('activeResult'); //show result box
  const scoreText = result_box.querySelector('.score_text');

  if (
    userSelectedOptions[3] == 'No' &&
    userSelectedOptions[4] == 'Yes' &&
    userSelectedOptions[5] == 'No' &&
    userSelectedOptions[6] == 'No' &&
    userSelectedOptions[7] == 'No' &&
    userSelectedOptions[8] == 'No' &&
    userSelectedOptions[9] == 'Yes' &&
    userSelectedOptions[10] == 'No'
  ) {
    let scoreTag =
      '<span>Congratulations! You are safe. But you still need to take safety precautions.</span>  <p>';
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (
    userSelectedOptions[2] == 'Sick' &&
    userSelectedOptions[3] == 'Yes' &&
    userSelectedOptions[4] == 'No' &&
    userSelectedOptions[5] == 'Yes' &&
    userSelectedOptions[6] == 'Yes' &&
    userSelectedOptions[7] == 'Yes' &&
    userSelectedOptions[8] == 'Yes' &&
    userSelectedOptions[9] == 'No' &&
    userSelectedOptions[10] == 'Yes'
  ) {
    // if user scored more than 1
    let scoreTag =
      '<span>Oops! It seems like chance of being positive to Covid-19 is high! You must concern to Doctor. .</span>  <p>';
    scoreText.innerHTML = scoreTag;
  } else if (
    userSelectedOptions[2] == 'Sick' &&
    userSelectedOptions[3] == 'Yes' &&
    userSelectedOptions[4] == 'No' &&
    userSelectedOptions[5] == 'Yes' &&
    userSelectedOptions[6] == 'Yes' &&
    userSelectedOptions[7] == 'Yes' &&
    userSelectedOptions[8] == 'Yes' &&
    userSelectedOptions[9] == 'No' &&
    userSelectedOptions[10] == 'Yes'
  ) {
    // if user scored more than 1
    let scoreTag =
      '<span>Oops! It seems like chance of being positive to Covid-19 is high! You must concern to Doctor. .</span>  <p>';
    scoreText.innerHTML = scoreTag;
  } else if (
    userSelectedOptions[2] == 'Sick' &&
    userSelectedOptions[3] == 'Yes' &&
    userSelectedOptions[4] == 'No' &&
    userSelectedOptions[5] == 'Yes' &&
    userSelectedOptions[6] == 'Yes' &&
    userSelectedOptions[7] == 'Yes' &&
    userSelectedOptions[8] == 'Yes' &&
    userSelectedOptions[9] == 'Yes' &&
    userSelectedOptions[10] == 'Yes'
  ) {
    // if user scored more than 1
    let scoreTag =
      '<span>Oops! It seems like chance of being positive to Covid-19 is high! You must concern to Doctor. .</span>  <p>';
    scoreText.innerHTML = scoreTag;
  } else if (
    userSelectedOptions[2] == 'Sick' &&
    userSelectedOptions[3] == 'Yes' &&
    userSelectedOptions[4] == 'No' &&
    userSelectedOptions[5] == 'Yes' &&
    userSelectedOptions[6] == 'Yes' &&
    userSelectedOptions[7] == 'Yes' &&
    userSelectedOptions[8] == 'Yes' &&
    userSelectedOptions[9] == 'No' &&
    userSelectedOptions[10] == ' No'
  ) {
    // if user scored more than 1
    let scoreTag =
      '<span>Oops! It seems like chance of being positive to Covid-19 is high! You must concern to Doctor. .</span>  <p>';
    scoreText.innerHTML = scoreTag;
  } else if (
    userSelectedOptions[2] == 'Sick' &&
    userSelectedOptions[3] == 'Yes' &&
    userSelectedOptions[4] == 'No' &&
    userSelectedOptions[5] == 'Yes' &&
    userSelectedOptions[6] == 'Yes' &&
    userSelectedOptions[7] == 'Yes' &&
    userSelectedOptions[8] == 'Yes' &&
    userSelectedOptions[9] == 'Yes' &&
    userSelectedOptions[10] == 'Yes'
  ) {
    // if user scored more than 1
    let scoreTag =
      '<span>Oops! It seems like chance of being positive to Covid-19 is high! You must concern to Doctor. .</span>  <p>';
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag = '<span>Chances of being positive are 50-50. You should consult to Doctor.</span>  <p>';
    scoreText.innerHTML = scoreTag;
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    '<span><p>' +
    index +
    '</p> of <p>' +
    questions.length +
    '</p> Questions</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
