import jsonPokemons from 'json-pokemon'
import Pokemon from './schemas/pokemon'


export { default as connect } from './connect'


export async function populateDbWithPokemons(){
    await Pokemon.countDocuments({}, function(err, count){
      console.log(count);

      if ( count < 1 ){
        Pokemon.collection.insertMany(jsonPokemons, function (err, docs) {
          if (err){ 
               throw new Error(err.message)
          } else {
            console.log("insertion de tous les objets reussi! ");
          }
        });
      }
  
    });

   
    

    
   

}