import { select, Separator } from '@inquirer/prompts'
import { settings } from '../../../ui/enums/Settings/settings.enum.js'
import { options } from '../../../ui/items/options.js'
import { viewController } from '../../../ui/controller/view.controller.js'
import { quit } from '../../../ui/items/quit.js'
import { getCollections } from '../../db.config.js'
import { config } from '../../../ui/enums/Settings/config.enum.js'
import { header } from './header.js'

export const SetupView = async() => {
    const currentCollections = await getCollections()

    const option = await select({
        message: `${header}`,
        pageSize: 40,
        choices: currentCollections.length > 0 ? normalSetup() : initialSetup()
    }, { clearPromptOnDone: true })

    return await viewController(option)
}

const initialSetup = () => {
    return [
        new Separator('You shall not pass! ...yet'),
        new Separator(' '),
        {
            name: 'Continue',
            value: config.setup.INITIAL,
            description: 'Create a new collection.',
        },
        new Separator(),
        quit,
        new Separator(' ')
    ]
}

const normalSetup = () => {
    return [
        new Separator('=================================================='),
        new Separator(' '),
        {
            name: 'Environment Variables',
            value: settings.ENVIRONMENT,
            description: 'Your environment variables.',
        },
        new Separator(),
        quit,
        new Separator(' ')
    ]
}