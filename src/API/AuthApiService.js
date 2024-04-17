import {serverApi} from "./Api";
import {FetchService} from "./FetchService";

export class AuthApiService{
    static async signIn(username, password){
        const response = await FetchService.post(`${serverApi}/auth/sign-in`, {username:username, password:password})
        if(response.status === 200){
            const data = await response.json()
            localStorage.setItem('token', data.token)
            console.log("Sign in success with token " + data.token)
        }
        else{
            throw new Error("Неверное имя пользователя или пароль");
        }
    }

    static async signUp(username, password, email){
        const response = await FetchService.post(`${serverApi}/auth/sign-up`, {username:username, password:password, email:email})
        if(response.status === 200){
            const data = await response.json()
            localStorage.setItem('token', data.token)
            console.log("Sign up success with token " + data.token)
        }
        else{
            throw new Error("Пользователь с таким именем уже существует");
        }
    }
}