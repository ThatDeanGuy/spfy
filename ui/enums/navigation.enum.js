import { settings } from './Settings/settings.enum.js'
import { ai } from './AI/ai.enum.js'
import { config } from './Settings/config.enum.js'

export const nav = Object.freeze({
    MENU: 'menu',
    AI: 'ai',
    ai: ai,

    PROJECTS: 'projects',
    WORKSPACE: 'workspace',

    SETTINGS: 'settings',
    settings: settings,

    CONFIG: config

})