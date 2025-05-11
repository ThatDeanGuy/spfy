import { input, confirm, select, Separator } from '@inquirer/prompts'
import { create } from '../../../../../config/db.config.js'
import { environmentVariablesView } from '../environment-variables.view.js'

export const addVariable = async() => {
    const key = await input({ message: 'Variable key:' }, { clearPromptOnDone: true })
    const value = await input({ message: 'Variable value:' }, { clearPromptOnDone: true })

    const confirm = await select({
        message: 'Save variable?',
        choices: [
            {
                name: 'Yes',
                value: true,
            },
            {
                name: 'No',
                value: false,
            }
        ]
    }, { clearPromptOnDone: true })
    console.log('key', key)
    console.log('value', value)
    console.log('confirm', confirm)
    if (confirm) {
        await create({ key: key, value: value })
        return environmentVariablesView()
    }
}