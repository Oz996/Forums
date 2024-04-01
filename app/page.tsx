import { getPosts } from "@/services/services";
import Posts from "./Posts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get(getBaseUrl() + "/api/posts");
      const data = res.data;
      return data;
    },
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </>
  );
}
