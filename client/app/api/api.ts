import axios from "axios";

export const getPosts = async () => {
  try {
    const data = await axios.get("https://forums-api.onrender.com/posts");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async (_id) => {
  try {
    const data = await axios.get(`https://forums-api.onrender.com/${_id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (user) => {
  try {
    const data = await axios.get(`https://forums-api.onrender.com/users/${user}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
