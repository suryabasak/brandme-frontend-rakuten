import { Product, CommentAProduct } from "./product";
import { UserModel } from "./user";

export class Sharedetails {
  VariantSize?: any;
  VariantColor?: string;
  Time?: number;
  SharedOn?: string;
}

export class ShareProductdetails {
  Product?: Product;
  Share?: Sharedetails;
  User?: UserModel;
  IsLikedByMe: boolean;
  IsDislikedByMe: boolean;
  TotalLike: string;
  TotalDislike: string;
  TotalShare: string;
  Comments?: Comments[];
  NewComment?: string;
  IsExpired: boolean;
}

export class ShareModel {
  Size?: string;
  Time?: string;
  Username?: string;
  ProductName?: string;
  Color?: string;
  Friends?: string;
}

export class Comments {
  CommentedOn: string;
  CommentedBy: UserModel;
  CommentedTo: UserModel;
  ProductName: string;
  Comment: string;
}
