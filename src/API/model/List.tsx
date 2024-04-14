export class List{
    id: number;
    name: string;
    isVisible: boolean;

    constructor(data: Partial<List>) {
        Object.assign(this, data);
    }
}