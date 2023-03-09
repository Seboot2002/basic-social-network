export interface User{

    name: string,
    surname: string,
    nick: string,
    email: string,
    password: string,
    _id?: string,
    role?: string,
    imagePath?: string
    getToken?: string
}