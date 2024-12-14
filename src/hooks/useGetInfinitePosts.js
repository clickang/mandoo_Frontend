import { useInfiniteQuery } from "@tanstack/react-query";
import getPosts from "./getPosts";

function useGetInfinitePosts() {
    return useInfiniteQuery({
        queryFn: ({ pageParam}) => {
            return getPosts({pageParam});  // 이곳에서만 API 호출
        },
        queryKey: ['posts'],
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
        const totalPages = lastPage?.result?.totalPages || 0;  // 전체 페이지 수
        const currentPage = allPages.length;  // 현재 로드된 페이지 수

            // 더 많은 페이지가 있으면 currentPage < totalPages일 때
            if (currentPage < totalPages) {
                return currentPage;  // 다음 페이지 번호 반환
            }

            return undefined;  // 더 이상 페이지가 없다면 undefined 반환
    },
    });
}

export { useGetInfinitePosts };

