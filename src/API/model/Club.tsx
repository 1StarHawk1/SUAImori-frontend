export class Club {
    public name: string;
    public imageURL: string;
    public description: string;
    public id: number;

    constructor(data: Partial<Club>) {
        Object.assign(this, data);
    }
}