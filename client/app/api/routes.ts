export async function GetPosts() {
  try {
    const res = await fetch("https://forums-api.onrender.com/posts");
    const data = await res.json();
    console.log("res", res);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function GetPost(id: string) {
  try {
    const res = await fetch(`https://forums-api.onrender.com/posts/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function GetUser(user: string) {
  try {
    const res = await fetch(`https://forums-api.onrender.com/users/${user}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
