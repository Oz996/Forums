export interface Theme {
  theme: string;
  setTheme: (theme: string) => void;
}

export interface Post {
  title: string;
  body: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  email: string;
  password: string;
  image: string;
  _id: string;
}

export interface Categories {
  id: number;
  value: string;
  name: string;
}

export interface Token {
  token: string;
}
