
export default interface UserModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  first_name: string;
  last_name: string;
  phone_number: string;
  last_login: string;
  display_name: string;
  isAdmin: boolean;
}
