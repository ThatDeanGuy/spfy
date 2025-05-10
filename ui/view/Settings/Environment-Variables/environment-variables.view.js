import { select, Separator } from '@inquirer/prompts'
import { viewController } from '../../../controller/view.controller.js'
import { options } from '../../../items/options.js'
import { nav } from '../../../enums/navigation.enum.js'
import { settings } from '../../../enums/Settings/settings.enum.js'


export const environmentVariablesView = async() => {
    const option = await select({
        message: 'Environment Variables',
        choices: [
            new Separator('=================================================='),
            {
                name: 'Add new',
                value: settings.environment.ADD,
                description: 'Your super cool AI tool!',
            },
            {
                name: 'List',
                value: settings.environment.LIST,
                description: 'Your environment environmentVariablesView.',
            },
            new Separator(),
            {
                name: 'back',
                value: nav.SETTINGS
            },
            ...options
        ],

    }, { clearPromptOnDone: true })

    return await viewController(option)
}
