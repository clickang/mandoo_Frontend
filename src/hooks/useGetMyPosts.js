import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const getPosts = async ({ pageParam, memberId, url }) => {
  const { data } = await axios.get(url, {
    params: {
      memberId: memberId, // 쿼리 파라미터로 memberId 전달
    },
  });
  return data;
};

function useGetMyPosts(url) {
  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser); // JSON 문자열을 객체로 변환
  const memberId = parsedUser.memberId; // memberId 가져오기

  return useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) => {
      return getPosts({ pageParam, memberId, url });
    },
    queryKey: ["posts", url], // queryKey에 url을 추가하여 URL 변경 시 쿼리가 새로 실행되도록 함
    initialData: { pages: [] }, // 초기 값 설정
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage?.result?.totalPages || 0;
      const currentPage = allPages.length;
      return currentPage < totalPages ? currentPage : undefined;
    },
    enabled: !!url, // url이 있을 때만 쿼리 실행
  });
}

export { useGetMyPosts };
