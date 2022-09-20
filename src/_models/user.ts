export type accountT = { account: number, amount: number, free: number };

export default class User {
    firstname = '';
    lastname = '';
    phone = '';
    address = '';
    avatar = '';
    email = '';
    postcode = '';
    refer = undefined;
    ownerid = 0;
    messageunread = 0;
    accounts: Array<accountT> = [];
    swift: any;
    invite = { name: '', phone: '', email: '' };
    amountraised = 0;
    amountnetraised = 0;
    versionuser = '';
    versionaccount = '';
    status = 0;
    rank = 0;
    autotransferprofit = false;
    autotransferbonus = false;
    commissionop = { min: 2, max: 1000000, percent: 0.003 };
    commissionoo = { min: 5, max: 100, percent: 0.5 };

    clear(): void {
        this.phone = '';
        this.firstname = '';
        this.lastname = '';
        this.avatar = '';
        this.postcode = '';
        this.refer = undefined;
        this.accounts = [];
        this.swift = undefined;
        this.invite = { name: '', phone: '', email: '' };
        this.versionuser = '';
        this.email = '';
        this.versionuser = '';
        this.versionaccount = '';
        this.ownerid = 0;
        this.messageunread = 0;
        this.status = 0;
        this.rank = 0;
        this.autotransferprofit = false;
        this.autotransferbonus = false;
        this.commissionop = { min: 2, max: 1000000, percent: 0.003 };
        this.commissionoo = { min: 5, max: 100, percent: 0.005 };
        this.amountraised = 0;
        this.amountnetraised = 0;
    }
    fullusername(): string {
        return this.lastname + ' ' + this.firstname;
    }
    findaccount(account: number): accountT {
        function find(element: accountT): accountT | undefined {
            if (element.account === account) {
                return element;
            }
        }
        if (this.swift && this.swift.account === account) {
            return this.swift;
        } else {
            return this.accounts.find(find) as accountT;
        }
    }
    strToBool(s: string): boolean {
        // will match one and only one of the string 'true','1', or 'on' rerardless
        // of capitalization and regardless off surrounding white-space.
        //
        const regex = /^\s*(true|1|on)\s*$/i
        return regex.test(s);
    }
    assign(data: any): void {
        this.phone = data.phone;
        this.email = data.email;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.messageunread = data.messageunread;
        this.avatar = data.avatar;
        this.refer = data.refer;
        this.invite = data.invite;
        this.status = data.status;
        this.amountraised = data.amountraised || this.amountraised;
        this.amountnetraised = data.amountnetraised || this.amountnetraised;
        this.rank = data.rank || this.rank;
        this.commissionop = data.commissionop || this.commissionop;
        this.commissionoo = data.commissionoo || this.commissionoo;
        this.assignautotransfer(data);
        this.assignaccount(data);
    }
    assignaccount<Type extends { swift: accountT, accounts: Array<accountT>, versionaccount: string }>(data: Type): void {
        this.swift = data.swift;
        this.accounts = data.accounts;
        this.versionaccount = data.versionaccount;
    }
    assignautotransfer<Type extends { autotransferprofit: any, autotransferbonus: any, versionuser: string }>(data: Type): void {
        if (typeof data.autotransferprofit == "string") {
            this.autotransferprofit = this.strToBool(data.autotransferprofit);
        } else {
            this.autotransferprofit = Boolean(data.autotransferprofit) || this.autotransferprofit;
        }
        if (typeof data.autotransferbonus == "string") {
            this.autotransferbonus = this.strToBool(data.autotransferbonus);
        } else {
            this.autotransferbonus = Boolean(data.autotransferbonus) || this.autotransferbonus;
        }
        this.versionuser = data.versionuser;
    }
    allamount(): string {
        return this.accounts.length > 0 ? this.accounts.reduce((s, item: accountT) => (s + item.amount),
            this.swift ? this.swift.amount : 0).toFixed(2) : "0.00";
    }
    printamount<Type extends { amount: number }>(a: Type): string {
        return a ? a.amount.toFixed(2) : '0.00';
    }
    printamountfree<Type extends { free: number }>(a: Type): string {
        return a ? a.free.toFixed(2) : '0.00';
    }
    printsubacount<Type extends { account: number }>(a: Type): string {
        return a ? a.account.toString().split(/(?=(?:....)*$)/).join(' ') : "";
    }
}
