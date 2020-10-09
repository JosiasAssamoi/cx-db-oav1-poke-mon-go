import chalk from 'chalk'


export default function display(str: string, color: string): void {
  // /!\ Challenge -->> typer correctement
  console.log((chalk as any)[color](str))
}

export function info(str: string): void {
  display(str, 'cyan')
}

export function success(str: string): void {
  display(str, 'green')
}

export function error(str: string): void {
  display(str, 'red')
}