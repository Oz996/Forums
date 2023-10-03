import axios from "axios";

export const getPosts = async () => {
  try {
    const data = await axios.get("http://localhost:7700/posts");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async (_id) => {
  try {
    const data = await axios.get(`http://localhost:7700/posts/${_id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (user) => {
  try {
    const data = await axios.get(`http://localhost:7700/users/${user}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
