import { Product } from "./product";

export class Category {
  public category: string;
  public brand: string[];
  public image: string;
  public isChecked: boolean;
}

export class SubCategory {
  public category: string;
  public subcategory: string;
  public image: string;
}

export class CategoryMenu {
  public category: string;
  public subcategory: string[];
}

export class CategoryProducts {
  public category: string;
  public products: Product[];
}
