import fs from 'fs'
import path from 'path'
import { addCollection } from '../config/db.config.js'

export const createNewCollection = async(name, pathName, content = {}) => {
    const spfyDir = path.join(pathName, '.spfy')
    const configPath = path.join(spfyDir, 'config.json')

    try {
        if (!fs.existsSync(spfyDir)) {
            fs.mkdirSync(spfyDir)
            console.log(`Created .spfy directory at ${spfyDir}`)
        } else {
            console.log('.spfy directory already exists.')
        }

        if (!fs.existsSync(configPath)) {
            fs.writeFileSync(configPath, JSON.stringify(content, null, 2))
            console.log('Created config.json inside .spfy')
        } else {
            console.log('config.json already exists inside .spfy')
        }
        await addCollection(name, pathName)
    } catch (err) {
        console.error('Failed to create .spfy/config.json:', err)
    }
}