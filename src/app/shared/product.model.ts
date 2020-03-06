export class Product {
    public productId : string;
    public productName : string;
    public productDescription : string;
    public productImageUrl : string;
    public productPrice : number;
    public productDiscount : number;
    public productSeller : string;
    public productBrand : string;
    public productCategory : string;
    public productAvailableQuantity : number;
    public rowId? : string;

    constructor(
        id : string,
        name : string,
        desc : string,
        imgUrl : string,
        price : number,
        discount : number,
        seller : string,
        brand : string,
        category : string,
        available : number,
        rowid? : string
    ) {
        this.productId = id;
        this.productName = name;
        this.productDescription = desc;
        this.productImageUrl = imgUrl;
        this.productPrice = price;
        this.productDiscount = discount;
        this.productSeller = seller;
        this.productBrand = brand;
        this.productCategory = category;
        this.productAvailableQuantity = available;
        this.rowId = rowid;
    }
}

// product.service.ts
// admin/add-product.component.ts