import React, { Fragment } from "react";
import styled from "styled-components";
import banner from "../images/banner.png";
import Card from "../components/Card";
import * as S from "../components/styles.jsx";
import { useEffect, useState, navigate } from "react";

import { ClipLoader } from "react-spinners";
import { useGetInfinitePosts } from "../hooks/useGetInfinitePosts.js";
import { useInView } from "react-intersection-observer";

import { Banner, HomePage, SectionTitle } from "./HomeStyles.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
  } = useGetInfinitePosts();

  useEffect(() => {
    console.log("Posts data:", posts); // 받아온 posts 데이터를 출력
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

  const navigate = useNavigate();


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
      <HomePage>
        <div className="main-banner">
          <Banner src={banner} alt="만두마켓 로고"></Banner>
        </div>

        <SectionTitle className="popular-items-header">
          중고 거래 인기 매물
        </SectionTitle>
        <>

      <S.CardContainer>
      {posts?.pages.map((page) => {
        return page.result.content.map((post,_) => (
            <Card key={post.sellPostId} post={post}
            onClick={() => {
              console.log(`Navigating to /sellpost/read/${post.sellPostId}`);
              navigate(`/sellpost/read/${post.sellPostId}`)}}
             />
        ));
      })}
      </S.CardContainer>
        <div style={{height:'50px',marginTop:'50px', display:"flex", justifyContent:'center',width:'100%'}}ref={ref}>
          {isFetching && <ClipLoader/>}

          </div>
        </>
      </HomePage>
    </Fragment>
  );
};

export default Home;
