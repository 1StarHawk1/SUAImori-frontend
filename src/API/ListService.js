import {serverApi} from "./Api";
import {FetchService} from "./FetchService";

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

    static async addTitle(listId, titleId, showError){
        const response = await FetchService.put(`${serverApi}/list/addTitle`, {listId:listId, titleId:titleId})
        if(response.status === 200){
            const text = await response.text();
            return text ? JSON.parse(text) : {};
        }
        else{
            showError("Ошибка добавления. Возможно, тайтл уже добавлен в список");
        }
    }
}