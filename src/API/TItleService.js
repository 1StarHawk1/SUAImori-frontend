import {FetchService} from "./FetchService";
import {serverApi} from "./Api";

export class TitleService {
    static async getTitle(id, name, posterURL) {
        const response = await FetchService.get(`${serverApi}/title/${id}?fields=${name}&fields=${posterURL}`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("Ну и ну! Что-то пошло не так!");
        }
    }
}