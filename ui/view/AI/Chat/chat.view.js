import { input, select, Separator } from '@inquirer/prompts'
import ora from 'ora'
import { system } from '../../../enums/system.enum.js'
import { nav } from '../../../enums/navigation.enum.js'
import { viewController } from '../../../controller/view.controller.js'
import { startWatcher, stopWatcher } from '../contextListener.js'
import { emitter } from '../../../../utils/emitter.util.js'
import OpenAI from 'openai'

// Initialize the client
const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY
})

function waitForEvent(spinner) {
    return new Promise((resolve) => {
        emitter.once('fileUpdated', (data) => {
            spinner.succeed()
            resolve(data)
        })
    })
}

export const ChatView = async(context = true) => {
    const spinner = ora({
        text: 'prompting...',
        spinner: 'binary',
        color: 'green',
    })
    //
    // let answer = null
    // if (context){
    //     spinner.start()
    //     startWatcher()
    //     answer = await input({ message: await waitForEvent(spinner) })
    // }

    const answer = await input({ message: 'You: ' })

    if (answer === system.BACK) {
        return viewController(nav.AI)
    }

    if (answer === '') {
        return ChatView()
    }

    try {
        spinner.start()
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // or "gpt-3.5-turbo"
            messages: [
                { role: 'system', content: 'you are an assistant named Spfy' },
                { role: 'system', content: answer }
            ],
        })

        if (response) spinner.stop()
        console.log(' ')
        console.log(response.choices[0].message.content)
        console.log(' ')
        return ChatView()
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error)
        return null
    }
}