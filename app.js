#!/usr/bin/env node
import { Command } from 'commander'
import { MenuView } from './ui/view/menu.view.js'
import { AiView } from './ui/view/AI/ai.view.js'
import { ChatView } from './ui/view/AI/Chat/chat.view.js'
import { emitter } from './utils/emitter.util.js'
require('dotenv').config();
const program = new Command()


program
    .version('1.0.0')
    .description('Get started')

program
    .command('go')
    .action(async() => {
        await MenuView()
    })

program
    .command('ai')
    .action(async() => {
        await AiView()
    })

program
    .command('chat')
    .action(async() => {
        await ChatView()
    })

program.parse(process.argv)

