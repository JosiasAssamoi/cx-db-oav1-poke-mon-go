import { Router, Request, Response } from 'express'
import {success , error } from './../helpers/response'
import {BAD_REQUEST,CREATED} from './../helpers/apiConstants'
import cors from 'cors'
import {isEmpty} from 'lodash'
import Pokemon from './../database/schemas/pokemon'

const api = Router()
api.use(cors())

api.get('/',async (req: Request, res: Response) => {
  try {
    const pokemons=await Pokemon.find((err,poke) =>{ return poke })
    if (!isEmpty(pokemons)){
        return res.status(CREATED.status).json(success(pokemons,'pokemons'))
    } 
    else{
      throw new Error('Pas de pokemons')
    }
    
  } catch (err) {    
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }

})

api.get('/:id',async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const pokemon=await Pokemon.findOne({'id':id})  
    
    if (!isEmpty(pokemon)){
        return res.status(CREATED.status).json(success(pokemon,'pokemon '))
    } 
    else{
      throw new Error('Pokemon inexistant')
    }
    
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.put('/:id',async (req: Request, res: Response) => {
  const {id} = req.params
  try {

    checkMissing(['name'],req)

    const pokemon =await Pokemon.findOne({'id':id})  
    if (pokemon != null){ 
      const { name,typeList } = req.body
      let update= {}
      if (typeList == undefined){
          update = {name:name}
      }
      else {
        update = {typeList : typeList , name:name}
      }
      const filter = { name: pokemon.name , id : pokemon.id };
      let doc = await Pokemon.findOneAndUpdate(filter, update, {
      new: true
      });
      return res.status(CREATED.status).json(success(doc,'pokemon'))
    }
    else{
      throw new Error('pokemon inexistant')
    }
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.delete('/:id',async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    checkMissing(['name'],req)
    const pokemon =await Pokemon.findOne({'id':id})  
    if (pokemon != null){ 
        Pokemon.deleteOne({id:pokemon.id,name:pokemon.name},(err :string) =>{
          if (err){
            throw new Error(err)
          }
        } ) 
      return res.status(CREATED.status).json(success(pokemon,'pokemon'))
    }
    else{
      throw new Error('pokemon inexistant')
    }
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})


export default api

function checkMissing(fields: string[], req: Request) {
  const missings = fields.filter((field: string) => !req.body[field])
  if (!isEmpty(missings)) {
    const isPlural = missings.length > 1
    throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
  }
}
