export interface User {
  name: string;
  image?: string;
  lastName?: string;
  password: string;
  email: string;
  status: boolean;
  rol: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface RequestLogin {

  access_token: string;
  user: User;

}