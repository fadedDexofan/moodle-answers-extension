var elements = document.querySelectorAll('.que');

var moodleSession = document
    .cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('MoodleSession='))
    ?.split('=')[1];

if (moodleSession)
    for (let el of elements) {
        var getAnswer = (event) => {
            browser.runtime.sendMessage({type: 'answerClaim', qid})
                .then((response) => {
                    if (!el.querySelector('.answer-found')) {
                        var answerSection = document.createElement('div');
                        answerSection.setAttribute('class', 'content formulation answer-found');
                        if (response.status === 'CORRECT') {
                            answerSection.setAttribute('style', 'text-align: center');
                        } else {
                            answerSection.setAttribute('style', 'text-align: center;background-color: #f5ebe7');
                        }

                        var screenshot = document.createElement('img');
                        screenshot.setAttribute('class', 'screenshot');
                        screenshot.setAttribute('src', response.screenshot);
                        screenshot.setAttribute('width', 200);
                        screenshot.setAttribute('height', 200);

                        answerSection.append(screenshot);
                        el.append(answerSection);
                    } else {
                        var answerSection  =  el.querySelector('.answer-found');
                        if (response.status === 'CORRECT') {
                            answerSection.setAttribute('style', 'text-align: center');
                        } else {
                            answerSection.setAttribute('style', 'text-align: center;background-color: #f5ebe7');
                        }

                        var screenshot = answerSection.querySelector('.screenshot');
                        screenshot.setAttribute('src', response.screenshot);
                    }
                });
        };

        var qidString = el
            .querySelector('.questionflagpostdata')
            .value
            ?.split('&')
            .find(id => id.startsWith('qid='))
            ?.split('=')[1];

        var qid = parseInt(qidString);

        var formulation = el.querySelector('.formulation');

        var answerButton = document.createElement('div');
        answerButton.setAttribute('class', 'submit btn btn-secondary');
        answerButton.textContent = browser.i18n.getMessage('answerButton');
        answerButton.addEventListener('click', getAnswer);

        formulation.append(answerButton);
    }
