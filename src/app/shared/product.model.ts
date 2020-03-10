export interface Rating {
    user : string;
    rating : number;
}

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
    public productBrandId : string;
    public productCategoryId : string;
    public productAvailableQuantity : number;
    public productHighlights : string[];
    public productUserRatings? : Rating[];
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
        brandId : string,
        categoryId : string,
        available : number,
        highlights : string[],
        userRatings? : Rating[],
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
        this.productBrandId = brandId;
        this.productCategoryId = categoryId;
        this.productAvailableQuantity = available;
        this.productHighlights = highlights;
        this.productUserRatings = userRatings;
        this.rowId = rowid;
    }
}

// product.service.ts
// admin/add-product.component.ts
// products/product-item.ts
// products/product-detail.ts