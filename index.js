const OpenAI = require("openai");
let openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

//send api call on submit
let objs = [];
let names = [];

const getResponse = async (ingredients) => {
    let response;
    try {
        response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `return json object with list of 10 dishes names, protein and sugar content in grams, and calories using ${ingredients} without linebreaks`,
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
        console.log(e);
        openai = new OpenAI({
            apiKey: "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",
            dangerouslyAllowBrowser: true
        });
        response = await openai.chat.completions.create ({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `return json object with list of 10 dishes names, protein and sugar content in grams, and calories using ${ingredients} without linebreaks`,
                },
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: .1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        

    }
   
    const resRaw = JSON.parse(response.choices[0].message.content);
    console.log(resRaw);
    
    
    objs = resRaw["dishes"];
    
    names = objs.map((obj) => obj.name);
    console.log(objs);
    console.log(names);

    showList();
    
    
    
};
//handle search
const spinner = document.querySelector('.spinner');


const recipeForm = document.querySelector('#recipe');
recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    
    spinner.style.visibility = "visible";

    getResponse(ingredients);
    recipeForm.reset();
})



//change sorting value
let selected = "unsorted";
const valuesForm = document.querySelector('#sortValue');
valuesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const sortedBy = document.querySelector('#sortedBy');
    const selectValues = document.querySelector('#values');
    

    

    selected = selectValues.value;
    console.log("submitted");
    console.log(selected);

    switch (selected) {
        case "protein":
            sortedBy.innerHTML = "Sorted by: Protein " + (ascend == true ? "Ascending" : "Descending");
            break;
        case "sugar":
            sortedBy.innerHTML = "Sorted by: Sugar " + (ascend == true ? "Ascending" : "Descending");
            break;
        case "calories":
            sortedBy.innerHTML = "Sorted by: Calories "  + (ascend == true ? "Ascending" : "Descending");
            break;
        case "unsorted":
            sortedBy.innerHTML = "Sorted by: None";
    

    }
    sortObjs(objs, selected);
})

//show list of ingredients
const showList = () => {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = "";
    for (let i = 0; i < names.length; i++)
    {
        let temp = `<li><button class="invis">${names[i]}`
        
        switch (selected)
        {
            case "protein":
                temp += ` (${objs[i]["protein"]}g)`;
                break;
            case "sugar":
                temp += ` (${objs[i]["sugar"]}g)`;
                break;
            case "calories":
                temp += ` (${objs[i]["calories"]})`;
                break;
            

        }
        recipeList.innerHTML += temp;
        recipeList.innerHTML += '</button></li>';
        
    }
    recipeClicks();
    spinner.style.visibility = "hidden";
}
let ascend = true;
//sort by value
const sortObjs = (objs, value) => {
    const sortType = document.getElementById('sortType');
    if (sortType.checked)
    {
        ascend = false;
        
    }
    if (!sortType.checked)
    {
        ascend = true;
        
    }

    if (objs.length != 0)
    {
        
        if (value != "unsorted")
        {
            if (ascend == true)
            {
            objs.sort((a, b) => {
                return a[value] - b[value];
            })
            }   
            else
            {
                objs.sort((a, b) => {
                    return b[value] - a[value];
                })
            }
            names = objs.map((obj) => obj.name);
        }
        
        
    }
    showList();
}
//give each listed item an onClick
const recipeClicks = () => {
    const listItems = document.getElementsByClassName('invis')
    
    
    for (let i = 0; i < listItems.length; i++)
    {
        listItems[i].addEventListener('click', () => {
            
            getRecipe(listItems[i].innerText, listItems[i])
            listItems[i].innerHTML += '<div class="spinnerSmall"></div>';
            
        })
    }
}

let steps = [];
//get recipe of selected item
const getRecipe = async (name, item) => {
    let response;
    try {
        response = await openai.chat.completions.create ({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `give JSON array of steps with no numbers for ${name} recipe with no linebreaks`,
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
        console.log(e);
        openai = new OpenAI({
            apiKey: "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",
            dangerouslyAllowBrowser: true
        });

        response = await openai.chat.completions.create ({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `give JSON array of steps with no numbers for ${name} recipe with no linebreaks`,
                },
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: .1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
    }
    
    
    steps = JSON.parse(response.choices[0].message.content);
    
    showRecipe(item);
    
    
}
const showRecipe = (item) => {
    const stepsContainer = document.getElementById('stepsList');
    
    item.innerHTML = item.innerHTML.replace('<div class="spinnerSmall"></div>', '');
    stepsContainer.innerHTML = "";
    const recipeName = document.getElementById('recipeName');
    recipeName.innerHTML = `<h3>${item.innerText}</h3>`

    for (let i = 0; i < steps.length; i++)
    {
        
        stepsContainer.innerHTML += `<li>${steps[i]}</li>`;
    }
    console.log(stepsContainer.innerHTML);
}
