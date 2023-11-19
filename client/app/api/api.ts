import axios from "axios";

export const getPosts = async () => {
  try {
    const data = await axios.get("http://localhost:3000/api/posts");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async (id: string) => {
  try {
    const data = await axios.get(`http://localhost:3000/api/post/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const data = await axios.get(`http://localhost:3000/api/user/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
