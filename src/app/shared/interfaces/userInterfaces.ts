export interface ILogin{
  login: string,
  password: string
}
export interface ISignIn{
  username: string,
  login: string,
  password: string,
  email: string
}
export interface IUpdateUser{
  avatarUrl?: string,
  name?: string,
  country?: string,
  description?: string,
  birthDate?: Date
}
export interface IUser{
  id: string,
  name: string,
  login: string,
  password: string,
  email: string,
  role: string,
  avatarUrl?: string,
  description?: string,
  birthDate?: Date,
  country?: string
}
