export class UserModel {
    public ProfileImage: string;
    public FirstName: string;
    public LastName: string;
    public Age: string;
    public Email: string;
    public Password: string; 
    public Gender: string;
    public Username: string;
    public PhoneNumber: string;
    public Address: string;
    public Provider: string;
    public PersonalizedCategories: string[];
    public PersonalizedBrands: string[];
    public exp: number;
    public iat: number;
    public isChecked?: boolean;
    public allvalue?: string;    
  }