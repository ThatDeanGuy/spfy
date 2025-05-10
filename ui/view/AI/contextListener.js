import chokidar from 'chokidar'
import { emitter } from '../../../utils/emitter.util.js'

let watcher = null

export const startWatcher = () => {
    if (watcher) return // prevent duplicate watchers

    watcher = chokidar.watch('C:\\Projects\\testing', {
        ignored: (path) =>
            path.includes('.idea') ||
            path.includes('node_modules') ||
            path.includes('.git') ||
            path.endsWith('.log') ||
            path.includes('dist') ||
            path.includes('build'),
        persistent: true
    })

    watcher.on('change', (filePath) => {
        emitter.emit('fileUpdated', filePath)
    })
}

export const stopWatcher = async() => {
    if (watcher) {
        await watcher.close()
        watcher = null
    }
}
