import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import {encode, decode} from 'gpt-3-encoder'

dotenv.config()

const router = express.Router()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.route('/').get((req, res) => {
    res.send('Hello from Resumen AI')
})

const mainPrompt = "Write the following transcript in bullet points or step by step depending on the type of information AND separate by sections (example: Section 1:....) and include any examples or metaphors that help the comprehension: (by the way, the less sections there are, the better)"

const tokens = (text) => {
    try {
        const encodedText = encode(text)
        const text_tokens = encodedText.length

        const price = text_tokens * 0.003 / 1000
        return {text_tokens, price}
    } catch (error) {
        console.error('Error in tokens function:', error);
        throw error;
    }
}

router.route('/tokens').post((req, res) => {
    try {
      const { text } = req.body
      if(text === '') {
        return res.status(200).json({ tokens: 0, price: 0}) 
      } else {
        const { text_tokens, price } = tokens(text); // Call the tokens function

        res.status(200).json({ tokens: text_tokens, price: price });
      }
    } catch (error) {
        console.log(error)
        res.status(500).send((error?.response?.data?.error?.message) || 'Something went wrong');
    }
})

router.route('/').post(async (req, res) => {
    try {
        const { text } = req.body
        const messages = [{"role": "system", "content": mainPrompt }, {role: "user", content: text }]

        const aiResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k",
            messages: messages,
        })

        const resumen = aiResponse.data.choices[0].message.content

        res.status(200).json({ resumen: resumen })
    } catch (error) {
        console.log(error)
        res.status(500).send((error?.response?.data?.error?.message) || 'Something went wrong');
    }
})

export default router