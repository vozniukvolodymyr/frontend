import User from '../_models/user';

export default class UserService {
    user = new User();
    constructor() {                
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (user && (Object.keys(user).length > 0)){
            this.user.assign(user);
        }
    }
    assign(data: any): any{
        this.user.assign(data);
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }
    assignaccount(data: any): any{
        this.user.assignaccount(data);
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }
    assignavatar(avatar: any): any{
        this.user.avatar = avatar;
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }
    messagereaded(messageunread: any): any{
        this.user.messageunread = messageunread;
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }
    assignautotransfer(data: any): any{
        this.user.assignautotransfer(data);
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }
}