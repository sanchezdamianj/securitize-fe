export interface Wallet {
    id?:number,
    address:string,
    account?:string,
    isOld?:boolean,
    isFavorite?:boolean,
    balance?:number
    deletedAt?: Date;
} 