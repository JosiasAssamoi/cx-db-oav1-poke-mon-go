import {isEmpty} from 'lodash'

export default function checkEnv(keys: string[]) {

  if (isEmpty(keys)) {
    return
  }

  const missingValues = keys.filter((k: string) => !(k in process.env))

  if (!isEmpty(missingValues)) {
    throw new Error(`Sorry can't found  mandatories values [ ${missingValues.join(', ')} ]`)
  }
}