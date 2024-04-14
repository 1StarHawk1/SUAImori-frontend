import {serverApi} from "./Api";

export class ListService{
    static async getUserLists(username){
        const response = await fetch(`${serverApi}/list/getuserlists/${username}`)
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error(`Invalid content-type! Expected application/json but received ${contentType}`);
        }
        return response.json()
    }
}