let currentQuestion = 0;
let correctAnswer = 0;
function init() {
    document.getElementById('questions').innerHTML = `<b>${currentQuestion + 1}</b> von <b>${questions.length}</b> Fragen`;
    showQuestion();
    manageProgressbar();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = question['question'];
    for (let i = 1; i < 5; i++) { let answer = document.getElementById(`answer_${i}`); answer.innerHTML = questions[currentQuestion][`answer_${i}`]; }}

function nextQuestion() {
    manageAnswerButtons('auto');
    document.getElementById('next-btn').disabled = true;
    currentQuestion += 1;
    resetBackgrounds();
    init();
    manageProgressbar();
}

function manageProgressbar()
{
    let progress = Math.round(currentQuestion / questions.length * (100));
    console.log(progress);
    document.getElementById('progress-bar').innerHTML = `${progress} %`;
    document.getElementById('progress-bar').style = `width: ${progress}%;`
}

function resetBackgrounds() {
    if (currentQuestion == 7) {
        document.getElementById('main-cards').classList.add('d-none');
        document.getElementById('end-screen').classList.remove('d-none');
        document.getElementById('end-text').innerHTML = `Du hast <b>${correctAnswer}</b> von <b>${questions.length}</b> richtig beantwortet!`;
        manageProgressbar();
        }
    for (let i = 1; i < 5; i++) {
        let text = document.getElementById(`answer_${i}`).parentNode;
        text.classList.remove('bg-danger');
        text.classList.remove('bg-success');}}

function manageAnswerButtons(param) {
    for (let i = 1; i < 5; i++) {
        let answer = document.getElementById(`answer_${i}`).parentNode;
        answer.style.pointerEvents = param;}}

function answer(selection) {
    let text = document.getElementById(`answer_${selection}`).parentNode;
    let rightAnswer = `answer_${questions[currentQuestion]['right_answer']}`;
    if (selection == questions[currentQuestion]['right_answer']) { text.classList.add('bg-success'); correctAnswer++; AUDIO_SUCCESS.play(); } else {
        text.classList.add('bg-danger');
        document.getElementById(rightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-btn').disabled = false;
    manageAnswerButtons('none');}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswer = 0;
    document.getElementById('main-cards').classList.remove('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    init();
}