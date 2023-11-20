import { getBaseUrl } from "@/lib/utils/URL";
import axios from "axios";

export const getPosts = async () => {
  try {
    const res = await axios.get(getBaseUrl() + "/api/posts");
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async (id: string) => {
  try {
    const res = await axios.get(getBaseUrl() + `/api/post/${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const res = await axios.get(getBaseUrl() + `/api/user/${id}`);
    const data = res.data;
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

export const getGuestbook = async (id: string) => {
  try {
    const res = await axios.get(getBaseUrl() + "/api/membership");
    const data = res.data;
    return data
  } catch (error) {
    console.error(error);
  }
}
