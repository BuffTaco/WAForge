const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});
const dishForm = document.querySelector('#recipe');
dishForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const dish = document.getElementById("dish").value;
    oneRecipe(dish);
    
    dishForm.reset();
})
const oneRecipe = async (dish) => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `give json array of ${dish} serving size and nutritional facts with no linebreaks and no whitespace`,
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    const raw = response.choices[0].message.content;
    console.log(raw);
    
}
