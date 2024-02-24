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
                content: 'return json format list of 10 dishes names and protein content in grams using chocolate, bread, and eggs without linebreaks',
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
getResponse();