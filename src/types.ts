export type Product = {
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
}

export type Option = {
  name: string,
  value: string,
}

export type User = {
  login: string,
  email: string,
  password: string,
  password2: string,
  birthDate: string,
  about: string,
  lang: string,
  skills: string[],
}

export type Colors = 'red'|'yellow'|'green'|'indigo'|'purple'|'pink'|'blue'|'dark'|'primary'|'none'