export type Product = {
    name : string,
    description : string,
    price : number,
    category : string,
    tags : string[],
    variants : object[],
    inventory: object
}