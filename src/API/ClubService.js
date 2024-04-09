import {FetchService} from "./FetchService";
import {serverApi} from "./Api";

export class ClubService {
    static async getAllIDs() {
        const response = await FetchService.get(`${serverApi}/club/getallids`);
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getClubIds Error!");
        }
    }

    static async getClub(id, fieldList: string[]) {
        const queryFieldsParams = fieldList.map(field => `fields=${field}`).join('&');

        const response = await FetchService.get(`${serverApi}/club/${id}?${queryFieldsParams}`)
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("getClub Error!");
        }
    }
}