export interface Wallet {
    id?:number,
    address:string,
    account?:string
    isFavorite?:boolean,
    balance?:number
    deletedAt?: Date;
} 