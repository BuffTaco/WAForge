const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});
const getResponse = async (ingredients) => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `return a list of names of dishes using ${ingredients} in json format`,
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
const form = document.querySelector('#recipe');
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;

    console.log(ingredients);
    form.reset();
})