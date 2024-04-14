export class Title{
    id: number;
    name: string;
    posterURL: string;
    itemCount: number;
    status: string;
    releaseDate: string;
    complitionDate: string;
    description: string;
    type: string;
    isNSFW: boolean;


    constructor(data: Partial<Title>) {
        Object.assign(this, data);
    }
}