const OpenAI = require("openai");
let openai = new OpenAI({
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
    let response;
    try {
        response = await openai.chat.completions.create ({
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
    }
    catch (e) {
        openai = new OpenAI({
            apiKey: "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",
            dangerouslyAllowBrowser: true
        })
        response = await openai.chat.completions.create ({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `give json of ${dish} serving size and nutritional facts with no linebreaks and no whitespace`,
                },
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: .1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

    }
    
    const raw = response.choices[0].message.content;
    console.log(raw);

    const processed = JSON.parse(raw);
    
    console.log(processed);
    const dishDesc = document.getElementById('dishDesc');
    let nutri;
    dishDesc.innerHTML += `<h3>${dish.toUpperCase()}:</h3>`
    
    if (typeof processed[0] == "string")
    {
        nutri = processed[1];
    }
    else
    {
        nutri = processed[0];
    }
    if ('Serving Size' in nutri)
    {
        dishDesc.innerHTML += `<h4>Serving Size: ${nutri["Serving Size"]}</h4>`;
        dishDesc.innerHTML += `<p>Calories: ${nutri["Calories"]}</p>`;
        dishDesc.innerHTML += `<p>Sugars: ${nutri["Sugars"]}g</p>`;
        dishDesc.innerHTML += `<p>Protein: ${nutri["Protein"]}g</p>`;
        dishDesc.innerHTML += `<p>Cholesterol: ${nutri["Cholesterol"]}mg</p>`;
        dishDesc.innerHTML += `<p>Sodium: ${nutri["Sodium"]}mg</p>`;
        dishDesc.innerHTML += `<p>Total Fat: ${nutri["Total Fat"]}g</p>`;
    }

    else {
        dishDesc.innerHTML += `<h4>Serving Size: ${nutri["serving_size"]}</h4>`;
        dishDesc.innerHTML += `<p>Calories: ${nutri["calories"]}</p>`;
        dishDesc.innerHTML += `<p>Sugars: ${nutri["sugars"]}g</p>`;
        dishDesc.innerHTML += `<p>Protein: ${nutri["protein"]}g</p>`;
        dishDesc.innerHTML += `<p>Cholesterol: ${nutri["cholesterol"]}mg</p>`;
        dishDesc.innerHTML += `<p>Sodium: ${nutri["sodium"]}mg</p>`;
        dishDesc.innerHTML += `<p>Total Fat: ${nutri["total_fat"]}g</p>`;
    }
    //dishDesc.innerHTML += `<h2>${processed[0]}</h2>`
    /*
    [0], access by name
     */
    
}
