import {FetchService} from "./FetchService";
import {serverApi} from "./Api";

export class UserService{
    static async getUser(username, fieldList: string[]){
        const queryFieldsParams = fieldList.map(field => `fields=${field}`).join('&');

        const response = await FetchService.get(`${serverApi}/user/${username}?${queryFieldsParams}`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getUser Error!");
        }
    }
}