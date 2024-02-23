export interface Product {
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
}

export interface Option {
  name: string,
  value: string,
}

export interface User {
  login: string,
  email: string,
  password: string,
  password2: string,
  birthDate: string,
  about: string,
  lang: string,
  skills: Array<string>,
}