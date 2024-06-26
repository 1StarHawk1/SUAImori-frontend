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

    static async joinClub(name) {
        const token = localStorage.getItem('token');
        try {
            const response = await FetchService.post(`${serverApi}/club/join`, {name: name},
                {'Authorization': `Bearer ${token}`});
            if (response.status === 200) {
                return response;
            } else {
                console.error('Server error status:', response.status);
                throw new Error("joinClub Error!");
            }
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }
    }

    static async leaveClub(name){
        const token = localStorage.getItem('token');
        try {
            const response = await FetchService.post(`${serverApi}/club/leave`, {name: name},
                {'Authorization': `Bearer ${token}`});
            if (response.status === 200) {
                return response;
            } else {
                console.error('Server error status:', response.status);
                throw new Error("leaveClub Error!");
            }
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }
    }

    static async checkMembership(id){
        const token = localStorage.getItem('token');
        try {
            const response = await FetchService.get(`${serverApi}/club/checkmembership/${id}`,
                {'Authorization': `Bearer ${token}`});
            if (response.status === 200) {
                return response;
            } else {
                console.error('Server error status:', response.status);
                throw new Error("checkMembership Error!");
            }
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }
    }

    static async getUserClubs(username){
        const response = await fetch(`${serverApi}/club/getuserclubs/${username}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error(`Invalid content-type! Expected application/json but received ${contentType}`);
        }
        return response.json()
    }

    static async createClub(newClub){
        const token = localStorage.getItem('token');
        try {
            const response = await FetchService.post(`${serverApi}/club/create`, newClub,
                {'Authorization': `Bearer ${token}`});
            if (response.status === 200) {
                return response;
            } else {
                console.error('Server error status:', response.status);
                throw new Error("createClub Error!");
            }
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }

    }
}