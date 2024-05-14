import {FetchService} from "./FetchService";
import {serverApi} from "./Api";

export class TitleService {

    static async getTitle(id, fieldList: string[]) {
        const queryFieldsParams = fieldList.map(field => `fields=${field}`).join('&');

        const response = await FetchService.get(`${serverApi}/title/${id}?${queryFieldsParams}`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getTitle Error!");
        }
    }

    static async getTitleIDs(){
        const response = await FetchService.get(`${serverApi}/title/getallids`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getTtitleIds Error!");
        }
    }

    static async getAnimeIDs(){
        const response = await FetchService.get(`${serverApi}/title/getallanimeids`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getAnimeIds Error!");
        }
    }

    static async getMangaIDs(){
        const response = await FetchService.get(`${serverApi}/title/getallmangaids`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getMangaIds Error!");
        }
    }

    static async getOngoingAnimeIDs(){
        const response = await FetchService.get(`${serverApi}/title/getongoinganimeids`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getOngoingAnimeIds Error!");
        }
    }

    static createTitle(form) {
        return FetchService.post(`${serverApi}/title`, form);

    }
}