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

export const getPost = async (id: string) => {
  try {
    const data = await axios.get(getBaseUrl() + `/api/post/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const data = await axios.get(getBaseUrl() + `/api/user/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getOptions = async () => {
  try {
    const res = await axios.get(getBaseUrl() + "/api/membership");
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
