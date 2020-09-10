// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';

// Product Size
export type ProductSize = 'M' | 'L' | 'XL';

// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product
export interface Product {
  id?: number;
  name?: string;
  price?: string;
  salePrice?: number;
  discount?: number;
  pictures?: any[];
  shortDetails?: string;
  description?: string;
  stock?: number;
  new?: boolean;
  sale?: boolean;
  category?: string;
  brand?: string;
  colors?: ProductColor[];
  size?: any[];
  tags?: ProductSize[];
  variants?: any[];
  isLiked?: boolean;
  subcategory?: string;
}

// Color Filter
export interface ColorFilter {
  color?: ProductColor;
}

// Tag Filter
export interface TagFilter {
  tag?: ProductTags
}

//Product Share Module
export interface Productshare {
  friends?: string;
  Username?: string;
  color?: string;
  size?: string;
  time?: string;
}

//Product Like Module
export interface LikeProduct {
  ProductName?: string;
  Username?: string;
}
//Product Dislike Module
export interface DislikeaProduct {
  ProductName?: string;
  Username?: string;
}

//Comment a Product
export interface CommentAProduct {
  Username?: string;
  Comment?: string;
  FriendUsername?: string;
  ProductName?: string;
}
// get user details
export interface GetUserDetails {
  Username?: string;
}

// show friendlist of user
export interface GetUserFriendlist {
  Username?: string;
}

//get active share products
export interface getActiveShareProducts {
  Username?: string;
}

//get product by brand
export interface getProductByBrand {
  Number?: number;
}

// Search Result Model
export interface searchResult {
  Name: string;
  Score: string;
  Product: Product[];
}

 // removeFriend
 export interface removeAfriend {
  FriendUsername: string;
  Username: string;
}

