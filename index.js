const OpenAI = require("openai");


const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});
const getResponse = async () => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'return a list of names of dishes using turkey, peas, and potatoes',
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log(response.choices[0].message);
};

const test = document.querySelector('#test');
test.addEventListener("click" , () => {
    console.log("test button");
});
const api = document.querySelector('#api');
api.addEventListener("click", () => {
    getResponse();
})