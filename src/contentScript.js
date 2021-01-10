const moodleSession = document
    .cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('MoodleSession='))
    ?.split('=')[1];

const getAnswer = (event) => {
    const question = event.path.find(el => el.classList.contains('que'));

    const qidString = question
        .querySelector('.questionflagpostdata')
        .value
        ?.split('&')
        .find((id) => id.startsWith('qid='))
        ?.split('=')[1];

    const qid = parseInt(qidString);

    browser.runtime.sendMessage({
            type: 'answerClaim',
            request: {
                domain: window.location.hostname,
                question_id: qid
            }
        })
        .then((response) => {
            if (!question.querySelector('.answer-found')) {
                const answerSection = document.createElement('div');
                answerSection.setAttribute('class', 'content formulation answer-found');
                if (response.status === 'CORRECT') {
                    answerSection.setAttribute('style', 'text-align: center');
                } else {
                    answerSection.setAttribute('style', 'text-align: center;background-color: #f5ebe7');
                }

                const screenshot = document.createElement('img');
                screenshot.setAttribute('class', 'screenshot');
                screenshot.setAttribute('src', response.screenshot);
                screenshot.setAttribute('width', 200);
                screenshot.setAttribute('height', 200);

                answerSection.append(screenshot);
                question.append(answerSection);
            } else {
                const answerSection = document.querySelector('.answer-found');
                if (response.status === 'CORRECT') {
                    answerSection.setAttribute('style', 'text-align: center');
                } else {
                    answerSection.setAttribute('style', 'text-align: center;background-color: #f5ebe7');
                }

                const screenshot = answerSection.querySelector('.screenshot');
                screenshot.setAttribute('src', response.screenshot);
            }
        });
};

const addAnswerButton = (question) => {
    const formulation = question.querySelector('.formulation');

    const answerButton = document.createElement('div');
    answerButton.setAttribute('class', 'submit btn btn-secondary');
    answerButton.textContent = browser.i18n.getMessage('answerButton');
    answerButton.addEventListener('click', getAnswer);

    formulation.append(answerButton);
};

const submitAttempt = (event) => {
    browser.runtime.sendMessage({
            type: 'parseClaim',
            request: {
                auth_cookie: moodleSession,
                attempt_url: window.location.href
            }
        })
        .then((response) => console.log(response))
        .catch((error) => {
            console.error(error);
        });
};

if (moodleSession) {
    const questions = document.querySelectorAll('.que');

    for (let question of questions) {
        addAnswerButton(question);
    }

    const submitButton = document.querySelector('.submitbtns > [type=submit]');

    if (submitButton) {
        submitButton.addEventListener('click', submitAttempt);
    };
}