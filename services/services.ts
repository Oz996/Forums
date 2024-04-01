import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import axios from "axios";

export const getPosts = async () => {
  try {
    const res = await axios.get(getBaseUrl() + "/api/posts");
    const data = res.data;
    return data;
    // console.log("ran ran ran");
    // const res = fetch(getBaseUrl() + "/api/posts");
    // const data = (await res).json();
    // return data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getPost = async (id: string) => {
  try {
    const res = await axios.get(getBaseUrl() + `/api/post/${id}`);
    const data = res.data;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUser = async (id: string) => {
  try {
    const res = await axios.get(getBaseUrl() + `/api/user/${id}`);
    const data = res.data;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getOptions = async () => {
  try {
    const res = await axios.get(getBaseUrl() + "/api/membership");
    const data = res.data;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getGuestbook = async (id: string) => {
  try {
    const res = await axios.get(getBaseUrl() + "/api/membership");
    const data = res.data;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};
