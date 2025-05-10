import { select, Separator } from '@inquirer/prompts'
import ora from 'ora'
import { viewController } from '../../controller/view.controller.js'
import { options } from '../../items/options.js'
import { ai } from '../../enums/AI/ai.enum.js'

export const AiView = async() => {
    const option = await select({
        message: 'welcome to spfy AI!',
        pageSize: 40,
        choices: [
            new Separator('=================================================='),
            new Separator(' '),
            {
                name: 'Chat',
                value: ai.CHAT,
                description: 'Some cool item',
            },
            {
                name: 'Generate',
                value: 'thing',
                description: 'Some cool item',
            },
            new Separator(),
            {
                name: 'AI settings',
                value: ai.SETTINGS,
                description: 'Update AI settings.',
            },
            ...options,
            new Separator(' ')
        ],
    }, { clearPromptOnDone: true })



    return await viewController(option)
    // if (option === 'thing'){
    //     const spinner = ora({
    //         text: 'Doing stuff...',
    //         spinner: 'binary',
    //         color: 'green',
    //     }).start()
    //
    //     try {
    //         await new Promise(resolve => setTimeout(resolve, 3000))
    //
    //         spinner.succeed('Build completed!')
    //         return AiView()
    //     } catch (err) {
    //         spinner.fail('Build failed.')
    //     }
    // } else {
    //     return await viewController(option)
    // }
}