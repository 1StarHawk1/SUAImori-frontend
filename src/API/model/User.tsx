export class User{
    public username: string;
    public nickname: string;
    public avatarURL: string;
    public profileWallpaperURL: number;
    public description: string;


    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
}