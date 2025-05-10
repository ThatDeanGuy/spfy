import { MenuView } from '../view/menu.view.js'
import { projectsView } from '../view/projects.view.js'
import { environmentVariablesView } from '../view/Settings/Environment-Variables/environment-variables.view.js'
import { settingsView } from '../view/Settings/settings.view.js'
import { nav } from '../enums/navigation.enum.js'
import { system } from '../enums/system.enum.js'
import { addVariable } from '../view/Settings/Environment-Variables/Add-Variables/addVariable.js'
import { AiView } from '../view/AI/ai.view.js'
import { ChatView } from '../view/AI/Chat/chat.view.js'
import { listVariable } from '../view/Settings/Environment-Variables/List-Variables/listVariables.view.js'

export const viewController = (command) => {
    switch (command) {
        // Navigation
        case nav.MENU:
            return MenuView()

        // SPFY AI
        case nav.AI:
            return AiView()
        case nav.ai.CHAT:
             return ChatView()

        case nav.PROJECTS:
            return projectsView()

        // Settings
        case nav.SETTINGS:
            return settingsView()
        // SETTINGS SUB MENU ITEMS
        case nav.settings.ENVIRONMENT:
            return environmentVariablesView()
        case nav.settings.environment.ADD:
            return addVariable()
        case nav.settings.environment.LIST:
            return listVariable()
        // System
        case system.QUIT:
            process.exit(0)
            break
        default:
            console.log('no such command.')
    }
}