import { select, Separator } from '@inquirer/prompts'
import { readAll } from '../../../../../config/db.config.js'
import { nav } from '../../../../enums/navigation.enum.js'
import { options } from '../../../../items/options.js'
import { viewController } from '../../../../controller/view.controller.js'

export const listVariable = async() => {
    const listResult = await readAll()
    const longest = listResult.reduce(
        (acc, variable) => {
            acc.key = Math.max(acc.key, variable.key.length)
            acc.value = Math.max(acc.value, variable.value.length)
            return acc
        },
        { key: 0, value: 0 }
    )
    let keyLength = longest.key + 1
    let valueLength = longest.value + 1

    if (keyLength % 2 !== 0) {
        keyLength ++
    }

    if (valueLength % 2 !== 0) {
        valueLength ++
    }

    let separatorLength = valueLength + keyLength + 5
    const variables = listResult.map((variable) => {
        const keySpacing = keyLength - variable.key.length
        const valueSpacing = valueLength - variable.value.length

        return {
            name: `| ${variable.key + ' '.repeat(keySpacing)}| ${variable.value + ' '.repeat(valueSpacing)}|`,
            value: variable.key
        }
    })
    variables.unshift(new Separator(` ${'-'.repeat(separatorLength)}`))
    variables.unshift(new Separator(` | KEY${' '.repeat(keyLength - 3)}| VALUE${' '.repeat(valueLength - 5)}|`))
    variables.unshift(new Separator(` ${'-'.repeat(separatorLength)}`))
    variables.push(
        new Separator(` ${'='.repeat(separatorLength)}`),
        new Separator(' '),
        {
            name: 'back',
            value: nav.settings.ENVIRONMENT,
        },
        ...options
    )
    const option = await select({
        message: 'UPDATE ENVIRONMENT VARIABLES',
        pageSize: 20,
        choices: variables
    }, { clearPromptOnDone: true })
    if (option) {
        return viewController(option)
    }
}