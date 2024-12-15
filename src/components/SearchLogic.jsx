// SearchLogic.js
import React, { Fragment, useEffect } from "react";
import { useGetInfiniteSearch } from "../hooks/useGetInfiniteSearch";
import { ClipLoader } from "react-spinners";
import Card from "./Card";
import * as S from "./styles";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SearchLogic = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const navigate = useNavigate();
  const {
    data: posts,
    isLoading,
    isFetching,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useGetInfiniteSearch(keyword);

  useEffect(() => {
    console.log("Search data:", posts); // 받아온 posts 데이터를 출력
  }, [posts]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    console.log("inView:", inView);
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    console.log("hasNextPage:", hasNextPage); // hasNextPage 값 로그
  }, [hasNextPage]);

  if (isPending) {
    return <h2>로딩중입니다 . . . </h2>;
  }
  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <Fragment>
      <S.SearchPage>
        <S.CardContainer>
          {posts?.pages.map((page) => {
            return page.result.content.map((post, _) => (
              <Card
                key={post.sellPostId}
                post={post}
                onClick={() => {
                  navigate(`/sellpost/read/${post.sellPostId}`);
                }}
              />
            ));
          })}
        </S.CardContainer>
        <div
          style={{
            height: "50px",
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
          ref={ref}
        >
          {isFetching && <ClipLoader />}
        </div>
      </S.SearchPage>
    </Fragment>
  );
};

export default SearchLogic;
