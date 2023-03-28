const express = require('express')
require('dotenv').config();
const{Configuration, OpenAIApi} = require('openai')

// express set up
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000

// open ai set up 
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
})
const openai = new OpenAIApi(configuration)

// api express

app.post("/make-itinerary", async (req, res)=>{
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role":"user", "content":`recommend an itinerary for a mother traveling with his son to valencia. Mother is 40 years old, son is 25 years old. Just return a json format with the places to visit`}],
            max_tokens: 64,
            temperature:0.8
        })
        console.log(response)
        return res.status(200).json({
            success: true,
            data: response.data.choices[0]
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:error.response
                ? error.response.data
                : "there was an issue on the server"
        })
    }
})

app.listen(port,() => console.log(`listening on por ${port}`));