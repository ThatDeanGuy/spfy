import { select, Separator } from '@inquirer/prompts'
import { viewController } from '../controller/view.controller.js'
import { quit } from '../items/quit.js'
import { nav } from '../enums/navigation.enum.js'

export const MenuView = async() => {
    const option = await select({
        message: 'MAIN MENU',
        pageSize: 20,
        choices: [
            new Separator('=================================================='),
            new Separator(' '),
            {
                name: 'spfy AI',
                value: nav.AI,
                description: 'Your super cool AI tool!',
            },
            {
                name: 'Projects',
                value: nav.PROJECTS,
                description: 'Search for npm packages!',
            },
            new Separator(),
            {
                name: 'Settings',
                value: nav.SETTINGS,
                description: 'Adjust your Settings',
            },
            quit,
            new Separator(' '),
        ]
    }, { clearPromptOnDone: true })

   return await viewController(option)
}