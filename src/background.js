console.log(window.location);

var mockSuccess = {
    id: "e0e41015-2ad3-4a04-a7b6-e0079ad85f17",
    question_id: 123,
    screenshot: "https://static-cdn.jtvnw.net/jtv_user_pictures/e20094e7-907c-4fba-9cf3-cd8e852de5db-profile_image-300x300.png",
    status: "CORRECT"
};

var mockFail = {
    id: "e0e41015-2ad3-4a04-a7b6-e0079ad85f17",
    question_id: 123,
    screenshot: "https://2fan.ru/upload/000/u1/f/7/9d8654a1.png",
    status: "FAIL"
};

var responseMock = () => (Math.random() > 0.5 ? mockSuccess : mockFail);

browser.runtime.onMessage.addListener(async (data, sender) => {
        if (data.type === 'answerClaim') {
            var response = await fetch('https://quotes.rest/qod');
            return responseMock();
        }
    }
);
