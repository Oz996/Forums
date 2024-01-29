export interface Theme {
  theme: string;
  setTheme: (theme: string) => void;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  editedAt: string;
  user: User;
  comments: Comment[];
}

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  image: string;
  createdAt: string;
  editedAt: string;
  posts: Post[];
  ProfileCommentReceived: ProfileComment[];
  isPremium: boolean;
}

export interface RegisterUser extends User {
  Cpassword: string;
  cardName?: string;
  cardNumber?: string;
}

export interface Categories {
  id: number;
  value: string;
  name: string;
}

export interface Token {
  token: string;
}

export interface PostData {
  title: string;
  body: string;
  category: string;
}

export interface UserData {
  userName: string;
  email: string;
}

export interface PostForm {
  title: string;
  body: string;
}

export interface ICommentForm {
  body: string
}

export interface EditComment {
  body: string;
}

export interface Comment {
  id: string;
  body: string | number;
  createdAt: string;
  editedAt: string;
  user: User;
}

export interface ProfileComment {
  id: string;
  body: string | number;
  createdAt: string;
  editedAt: string;
  sender: User;
}

export interface Membership {
  id: string;
  option: string;
  price: number;
  description: string;
  features: string[];
}
