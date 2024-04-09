export class ClubMiniature {
    public name: string;
    public imageURL: string;
    public id: number;

    constructor(data: Partial<ClubMiniature>) {
        Object.assign(this, data);
    }
}