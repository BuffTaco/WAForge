import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()
const openai = new OpenAI({
    apiKey: process.env.API_KEY1,
});
console.log("called");

const getResponse = async () => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'return json object with list of 10 dishes names, protein and sugar content in grams, and calories using wheat, tomato, eggs without linebreaks',
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    const dishes = JSON.parse(response.choices[0].message.content)["dishes"];
    console.log(dishes);
    
};
const getRecipe = async () => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'give JSON array of steps with no numbers for Spaghetti Bolognese recipe with no linebreaks',
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    const raw = response.choices[0].message.content
    console.log(raw);
    const processed = JSON.parse(raw);
    console.log(processed[0]);
    
}

const oneRecipe = async () => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'give json array of fried squid serving size and nutritional facts with no linebreaks and no whitespace',
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log(response.choices[0].message);
    
}
getRecipe();