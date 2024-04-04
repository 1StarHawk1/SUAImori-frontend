export class TitleMiniature {
    public name: string;
    public posterURL: string;
    public id: number;

    constructor(data: Partial<TitleMiniature>) {
        Object.assign(this, data);
    }
}