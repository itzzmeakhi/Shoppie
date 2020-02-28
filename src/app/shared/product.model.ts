export class Product {
    public productName : string;
    public productDescription : string;
    public productImageUrl : string;
    public productPrice : number;
    public productDiscount : number;
    public productSeller : string;
    public productBrand : string;
    public productCategory : string;
    public productSubCategory : string;

    constructor(
        name : string,
        desc : string,
        imgUrl : string,
        price : number,
        discount : number,
        seller : string,
        brand : string,
        category : string,
        subcategory : string
    ) {
        this.productName = name;
        this.productDescription = desc;
        this.productImageUrl = imgUrl;
        this.productPrice = price;
        this.productDiscount = discount;
        this.productSeller = seller;
        this.productBrand = brand;
        this.productCategory = category;
        this.productSubCategory = subcategory;
    }
}