import { GetPosts } from "@/app/api/routes";
import Posts from "@/components/Posts";

export default async function Page() {
  const data = await GetPosts();

  return <Posts data={data} />;
}
