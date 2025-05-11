import { input, select, Separator } from '@inquirer/prompts'
import chalk from 'chalk'
import { viewController } from '../../../ui/controller/view.controller.js'
import * as fs from 'node:fs'
import path from 'node:path'
import autocomplete from 'inquirer-autocomplete-standalone'
import { quit, quit as item } from '../../../ui/items/quit.js'
import { nav } from '../../../ui/enums/navigation.enum.js'
import { header } from './header.js'
import { createNewCollection } from '../../../services/config.service.js'
import { MenuView } from '../../../ui/view/menu.view.js'

export const InitialSetupView = async() => {
    const collectionName = await input(
        {
            message:
                `${header}` +
                `\n ${chalk.gray('One Collection to rule them all..')}` +
                '\n' +
                `\n ${chalk.green('Name thy glorious abomination!')}` +
                '\n'
        },
        { clearPromptOnDone: true }
    )

    let currentPath = process.cwd()

    while (true){
    const items = fs.readdirSync(currentPath).filter(item => {
        const fullPath = path.join(currentPath, item)
        try {
            return fs.statSync(fullPath).isDirectory()
        } catch {
            return false
        }
    })

    let choices = [
        ...(path.parse(currentPath).root !== currentPath ? [{ name: '📁..' }] : []),
        ...items.map(name => ({ name }))
    ]

    choices = choices.map(choice => ({
        name: choice.name,
        value: choice.name
    }))

    const selected = await select({
        message: [
            `${header}` +
            `\n${chalk.green('Select a root directory for your collection.')}` +
            '\n' +
            `\n 🗃️ ${currentPath}`
        ],
        choices,
    }, { clearPromptOnDone: true })

    if (selected === '📁..') {
        currentPath = path.resolve(currentPath, '../')
    } else {
        currentPath = path.join(currentPath, selected)
    }

    const confirm = await select({
        message: [
            `${header}` +
            `\n${chalk.green('Select')} "${currentPath}" ${chalk.green('as collection root?')}` +
            '\n' +
            '\n'
        ],
        choices: [
            new Separator(),
            { name: 'Yes', value: 'yes' },
            { name: '/📁', description: 'Enter directory' },
            new Separator()
        ]
    }, { clearPromptOnDone: true })

    if (confirm === 'yes') {
        break
    }
}
    const confirmCollection = await select({
        message: [
            `${header}` +
            `\n ${chalk.gray('“I’m glad to be with you, Samwise Gamgee…')}` +
            `\n ${chalk.gray('here at the end of all things.”')}` +
            '\n' +
            `\nCollection: ${chalk.green(collectionName)}` +
            `\nPath: ${chalk.green(currentPath)}` +
            '\n' +
            '\n'
        ],
        choices: [
            new Separator(),
            { name: 'Save', value: 'save' },
            { name: 'Edit', value: 'edit' },
            new Separator(),
            quit,
        ]
    }, { clearPromptOnDone: true })

    if (confirmCollection === 'save') {
        await createNewCollection(collectionName, currentPath)
        return await MenuView()
    }

    if (confirmCollection === 'edit') {
        return InitialSetupView()
    }

    return await viewController(confirmCollection)
}