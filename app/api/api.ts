import { getBaseUrl } from "@/lib/utils/URL";
import axios from "axios";

export const getPosts = async () => {
  try {
    const data = await axios.get(getBaseUrl() + "/api/posts");
    return data;
  } catch (error) {
    console.error(error);
  }
};
// "https://next-forums.vercel.app/api/posts"

export const getPost = async (id: string) => {
  try {
    const data = await axios.get(getBaseUrl() + `/api/post/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
// `http://localhost:3000/api/post/${id}`
export const getUser = async (id: string) => {
  try {
    const data = await axios.get(getBaseUrl() + `/api/user/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
// `http://localhost:3000/api/user/${id}`
