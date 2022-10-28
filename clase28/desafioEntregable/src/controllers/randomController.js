import { fork } from 'child_process'


const randomsController = (req, res) =>{

    let cantidad = req.query.cantidad ?? 100000

    const forked = fork('src/api/random.js')

    forked.on('message', msg=>{
        if (msg === 'Finalizado'){
            forked.send(cantidad)
        } else {
            res.json(msg)
        }
    })

}


export default randomsController