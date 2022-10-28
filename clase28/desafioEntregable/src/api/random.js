import getRandomNumbers from '../utils/getRandomNumbers.js'

process.on('message', msg=>{
    process.send(getRandomNumbers(msg))
    process.exit()
})

process.send('Finalizado')