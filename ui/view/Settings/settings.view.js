import { select, Separator } from '@inquirer/prompts'
import { viewController } from '../../controller/view.controller.js'
import { options } from '../../items/options.js'
import { settings } from '../../enums/Settings/settings.enum.js'

export const settingsView = async() => {
    const option = await select({
        message: 'SETTINGS',
        pageSize: 40,
        choices: [
            new Separator('=================================================='),
            new Separator(' '),
            {
                name: 'Environment Variables',
                value: settings.ENVIRONMENT,
                description: 'Your environment variables.',
            },
            new Separator(),
            ...options,
            new Separator(' ')
        ]
    }, { clearPromptOnDone: true })

    return await viewController(option)
}