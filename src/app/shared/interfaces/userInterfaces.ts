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

export interface IUser{
  id: string,
  name: string,
  email: string,
  role: string,
  avatarUrl?: string,
  description?: string,
  birthDate?: Date,
  country?: string
}
