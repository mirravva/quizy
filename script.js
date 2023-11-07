function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Handle the fullscreen change event to exit full-screen mode
document.addEventListener("fullscreenchange", exitFullscreen);
document.addEventListener("mozfullscreenchange", exitFullscreen);
document.addEventListener("webkitfullscreenchange", exitFullscreen);
document.addEventListener("MSFullscreenChange", exitFullscreen);

function exitFullscreen() {
    if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
    ) {
        document.exitFullscreen();
    }
}

const questions = [
    ["Обычно я спокоен и вывести меня из себя нелегко.", ["Да", "Нет"]],
    ["Мои нервы расстроены не более, чем у других людей.", ["Да", "Нет"]],
    ["У меня редко бывают запоры.", ["Да", "Нет"]],
    ["У меня редко бывают головные боли.", ["Да", "Нет"]],
    ["Я редко устаю.", ["Да", "Нет"]],
    ["Я почти всегда чувствую себя вполне счастливым.", ["Да", "Нет"]],
    ["Я уверен в себе.", ["Да", "Нет"]],
    ["Практически я никогда не краснею.", ["Да", "Нет"]],
    ["По сравнению со своими друзьями я считаю себя вполне смелым человеком.", ["Да", "Нет"]],
    ["Я краснею не чаще, чем другие.", ["Да", "Нет"]],
    ["У меня редко бывает сердцебиение.", ["Да", "Нет"]],
    ["Обычно мои руки достаточно теплые.", ["Да", "Нет"]],
    ["Я застенчив не более чем другие.", ["Да", "Нет"]],
    ["Мне не хватает уверенности в себе.", ["Да", "Нет"]],
    ["Порой мне кажется, что я ни на что не годен.", ["Да", "Нет"]],
    ["У меня бывают периоды такого беспокойства, что я не могу усидеть на месте.", ["Да", "Нет"]],
    ["Мой желудок сильно беспокоит меня.", ["Да", "Нет"]],
    ["У меня хватает духа вынести все предстоящие трудности.", ["Да", "Нет"]],
    ["Я хотел бы быть таким же счастливым, как другие.", ["Да", "Нет"]],
    ["Мне кажется порой, что передо мной нагромождены такие трудности, которые мне не преодолеть.", ["Да", "Нет"]],
    ["Мне нередко снятся кошмарные сны.", ["Да", "Нет"]],
    ["Я замечаю, что мои руки начинают дрожать, когда я пытаюсь что-либо сделать.", ["Да", "Нет"]],
    ["У меня чрезвычайно беспокойный и прерывистый сон.", ["Да", "Нет"]],
    ["Меня весьма тревожат возможные неудачи.", ["Да", "Нет"]],
    ["Мне приходилось испытывать страх в тех случаях, когда я точно знал, что мне ничто не угрожает.", ["Да", "Нет"]],
    ["Мне трудно сосредоточиться на работе или на каком-либо задании.", ["Да", "Нет"]],
    ["Я работаю с большим напряжением.", ["Да", "Нет"]],
    ["Я легко прихожу в замешательство.", ["Да", "Нет"]],
    ["Почти все время испытываю тревогу из-за кого-либо или из-за чего-либо.", ["Да", "Нет"]],
    ["Я склонен принимать все слишком всерьез.", ["Да", "Нет"]],
    ["Я часто плачу.", ["Да", "Нет"]],
    ["Меня нередко мучают приступы рвоты и тошноты.", ["Да", "Нет"]],
    ["Раз в месяц или чаще у меня бывает расстройство желудка.", ["Да", "Нет"]],
    ["Я часто боюсь, что вот-вот покраснею.", ["Да", "Нет"]],
    ["Мне очень трудно сосредоточиться на чем-либо.", ["Да", "Нет"]],
    ["Мое материальное положение весьма беспокоят меня.", ["Да", "Нет"]],
    ["Нередко я думаю о таких вещах, о которых ни с кем не хотелось бы говорить.", ["Да", "Нет"]],
    ["У меня бывали периоды, когда тревога лишала меня сна.", ["Да", "Нет"]],
    ["Временами, когда я нахожусь в замешательстве, у меня появляется сильная потливость, что очень смущает меня.", ["Да", "Нет"]],
    ["Даже в холодные дни я легко потею.", ["Да", "Нет"]],
    ["Временами я становлюсь таким возбужденным, что мне трудно заснуть.", ["Да", "Нет"]],
    ["Я - человек легко возбудимый.", ["Да", "Нет"]],
    ["Временами я чувствую себя совершенно бесполезным.", ["Да", "Нет"]],
    ["Порой мне кажется, что мои нервы сильно расшатаны, и я вот - вот выйду из себя.", ["Да", "Нет"]],
    ["Я часто ловлю себя на том, что меня что-то тревожит.", ["Да", "Нет"]],
    ["Я гораздо чувствительнее, чем большинство других людей.", ["Да", "Нет"]],
    ["Я почти все время испытываю чувство голода.", ["Да", "Нет"]],
    ["Ожидание меня нервирует.", ["Да", "Нет"]],
    ["Жизнь для меня связана с необычным напряжением.", ["Да", "Нет"]],
    ["Ожидание всегда нервирует меня.", ["Да", "Нет"]],
];


const quizContainer = document.querySelector('.quiz-container');
const feedback = document.createElement('p');
let currentQuestionIndex = 0;
let score = 0;

function createClickableImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('clickable-image');
    img.addEventListener('click', () => openFullscreen(img));
    return img;
}

// Function to display the current question and options
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const [questionText, options] = questions[currentQuestionIndex];

        // Display the question text
        const questionElement = document.getElementById('question');
        questionElement.textContent = questionText;

        // Display the answer options
        const optionsContainer = document.querySelector('.options-container');
        optionsContainer.innerHTML = '';

        options.forEach((option, index) => {
            const optionId = `option${index + 1}`;
            const label = document.createElement('label');
            label.setAttribute('for', optionId);
            label.textContent = option;

            const input = document.createElement('input');
            input.type = 'radio';
            input.id = optionId;
            input.name = 'answer';
            input.value = option;

            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.appendChild(input);
            optionDiv.appendChild(label);

            optionsContainer.appendChild(optionDiv);
        });
    } else {
        quizContainer.innerHTML = '';
        if (questions.length - score >= 30) {
            const scoreText = document.createElement('p');
            scoreText.innerHTML = 'Чтобы у Вас уменьшилась тревожность, предлагаем Вам посмотреть на эти картинки. Если проблема не уходит длительное время, лучше обратится к психологу.';
            quizContainer.appendChild(scoreText);
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            for (let i = 0; i < 2; i++) {
                const row = document.createElement('div');
                row.classList.add('row');

                for (let j = 1; j < 4; j++) {
                    const img = createClickableImage(`images/${j}_${i}.jpeg`);
                    row.appendChild(img);
                }

                imageContainer.appendChild(row);
            }
            quizContainer.appendChild(imageContainer);
        }
        else {
            const scoreContainer = document.createElement('div');
            scoreContainer.classList.add('score-container');

            const scoreTitle = document.createElement('h2');
            scoreTitle.textContent = `Все норм, у тебя ${(score / questions.length) * 100}/100 уровень тревоги`;
            scoreContainer.appendChild(scoreTitle);
            quizContainer.appendChild(scoreContainer);
        }
    }
}

// Function to check the selected answer and move to the next question
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const answer = selectedAnswer.value;

        // Check if the answer is correct (you can implement your own scoring logic)
        if (answer === questions[currentQuestionIndex][1][0]) {
            score++;
        }

        currentQuestionIndex++;
        displayQuestion();
    }
}

// Initialize the quiz by displaying the first question
displayQuestion();

// Add an event listener to the submit button to check the answer
const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', checkAnswer);
