console.log(window.location);

const mockSuccess = {
    id: "e0e41015-2ad3-4a04-a7b6-e0079ad85f17",
    question_id: 123,
    screenshot: "https://static-cdn.jtvnw.net/jtv_user_pictures/e20094e7-907c-4fba-9cf3-cd8e852de5db-profile_image-300x300.png",
    status: "CORRECT"
};

const mockFail = {
    id: "e0e41015-2ad3-4a04-a7b6-e0079ad85f17",
    question_id: 123,
    screenshot: "https://2fan.ru/upload/000/u1/f/7/9d8654a1.png",
    status: "FAIL"
};

const responseMock = () => (Math.random() > 0.5 ? mockSuccess : mockFail);

browser.runtime.onMessage.addListener(async (data, sender) => {
    switch (data.type) {
        case 'answerClaim':
            const response = await fetch('http://example.com', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.request)
            });
            return responseMock(); //response.json();
        case 'parseClaim':
            const response = await fetch('http://example.com', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.request)
            });
            return response.json();
        default:
            return {};
    }
});