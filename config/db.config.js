import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const CONFIG_PATH = resolve(__dirname, 'config.json')

async function readDB() {
    try {
        const data = await readFile(CONFIG_PATH, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function writeDB(data) {
    await writeFile(CONFIG_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export const addCollection = async(name, path) => {
    const db = await readDB()
    db.settings.collections.push({ name, path })
    await writeDB(db)
    return true
}

export const getCollections = async() => {
    const db = await readDB()
    return db.settings.collections
}

export async function create(record) {
    const db = await readDB()
    record.id = Date.now()
    db.push(record)
    await writeDB(db)
    return record
}

export async function readAll() {
    return await readDB()
}

export async function readById(id) {
    const db = await readDB()
    return db.find(item => item.id === id)
}

export async function update(id, newData) {
    const db = await readDB()
    const index = db.findIndex(item => item.id === id)
    if (index === -1) return null
    db[index] = { ...db[index], ...newData }
    await writeDB(db)
    return db[index]
}

export async function remove(id) {
    const db = await readDB()
    const updated = db.filter(item => item.id !== id)
    if (db.length === updated.length) return false
    await writeDB(updated)
    return true
}
