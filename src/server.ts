import { error, info, success } from './helpers/display'
import checkEnv from './helpers/checkEnv'
import { connect, populateDbWithPokemons} from './database'
import express from 'express'
import bodyParser from 'body-parser'
import api from './routes'

import Pokemon from './database/schemas/pokemon'

function initExpress(host : String , port :  Number){
   const app = express()
   // this allows the parsing in a correct json format .. I guess
   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({ extended: false }))
   // entry point of the api
   app.use('/pokemons', api)
   return app
}

async function main() {
  try {
    checkEnv(['PORT', 'HOST', 'DATABASE_URI'])
    info('Server initialization...')

    // DB connection
    await connect(process.env.DATABASE_URI as string)
    success('Database successfully connected!')

    // Fill database with Pokemons from json pokemon lib 
    populateDbWithPokemons()


    //Server initialiAlizing
    const port = process.env.PORT as string
    const host = process.env.HOST as string
    const app = await initExpress(host, parseInt(port, 10))
    app.listen(port,()=>{
      success(`api launched on port http://${host}:${port}`)
    })
    

    // const pokemon = new Pokemon()

    // pokemon.save((err) => {
    //   if (err) {
    //     error('sorry')
    //   }

    //   success('pokemon saved!')
    // })


  } catch (e) {
    error(e.message)
  }
}

// Entry point 😎
main()
