import {isArray,isEmpty} from"lodash"

/* eslint-disable @typescript-eslint/no-explicit-any */
type RepsonseOk = {
  data: {
    [name: string]: any
  }
}

type ResponseKo = {
  err: {
    status: number
    code: string
    description: string
  }
}

export function success(resource: any,name : string =''): RepsonseOk {
  
name = (isEmpty(name)) ? 'unknow' : name


 return isArray(resource) ? { data: { [name]: resource } } : { data: { [name]: resource } }
}

export function error({ status, code }: { status: number; code: string }, err: any): ResponseKo {
  const description = err.detail ? err.detail : err.message

  return {
    err: {
      status,
      code,
      description,
    },
  }
}
