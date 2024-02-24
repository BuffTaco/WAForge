const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

//send api call on submit
let objs = [];
let names = [];

const getResponse = async (ingredients) => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `return json format list of 10 dishes names and protein content in grams using ${ingredients} without linebreaks`,
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log(response.choices[0].message);
    const resRaw = response.choices[0].message.content;
    console.log(resRaw)
    
    objs = JSON.parse(resRaw)["dishes"];
    names = objs.map((obj) => obj.name);
    console.log(objs);
    console.log(names);

    showList();
    
    
    
};
const recipeForm = document.querySelector('#recipe');
recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;

    getResponse(ingredients);
    recipeForm.reset();
})

//show list of ingredients
const showList = () => {
    const recipeList = document.getElementById('recipeList');
    for (let i = 0; i < names.length; i++)
    {
        recipeList.innerHTML += `<li>${names[i]}</li>`
    }
}

//change sorting value
let selected = "none";
const valuesForm = document.querySelector('#sortValue');
valuesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectValues = document.querySelector('#values');

    selected = selectValues.value;
    console.log("submitted");
    console.log(selected);
    sortObjs(objs);
})

//sort by value
const sortObjs = (objs) => {
    if (objs.length != 0)
    {
        console.log("not empty");
        console.log(objs);
    }
    
}
