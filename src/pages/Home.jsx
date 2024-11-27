import React from 'react';
import styled from 'styled-components';
import banner from '../images/banner.png';
import Card from '../components/Card';
import * as S from '../components/styles.jsx';
import { useEffect, useState } from "react";
import useGetPosts from '../hooks/getPosts.js';
import { ClipLoader } from "react-spinners";
import { useGetInfinitePosts } from '../hooks/useGetInfinitePosts.js';
import { useInView } from "react-intersection-observer";
const Home = () => {
  const {data :posts,
    isLoading, 
    isFetching, 
    isPending, 
    hasNextPage, 
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError
   }=useGetInfinitePosts();

   useEffect(() => {
    console.log("Posts data:", posts);  // 받아온 posts 데이터를 출력
  }, [posts]);

  const {ref,inView}=useInView({
    threshold:0,
  })

  useEffect(()=>{
    console.log('inView:', inView);
    if(inView){
      !isFetching && hasNextPage &&fetchNextPage();
      }
  },[inView,isFetching,hasNextPage,fetchNextPage]);
  
  useEffect(() => {
    console.log('hasNextPage:', hasNextPage); // hasNextPage 값 로그
  }, [hasNextPage]);

  if(isPending){
    return(
      <h2>로딩중입니다 . . . </h2>
      
    )
  }
  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }
  return (
    <div>
        <div className="main-banner" >
        <Banner src={banner} alt="만두마켓 로고" ></Banner>
      </div>

        <SectionTitle className="popular-items-header">
        <h3>중고 거래 인기 매물</h3>
        </SectionTitle>
        <>
      <S.CardContainer>
      {posts?.pages.map((page) => {
        return page.result.content.map((post,_) => (
          <Card key={post.sellPostId} post={post} />
        ));
      })}
      </S.CardContainer>
        <div style={{height:'50px',marginTop:'50px', display:"flex", justifyContent:'center',width:'100%'}}ref={ref}>
          {isFetching && <ClipLoader/>}
          </div>
        </>
   </div>
        
  );
};

export const Banner =styled.img`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column; 
  height: auto;
  padding-left: 10%;
  padding-top: 30px;
`;
export const SectionTitle = styled.h3`
  margin-left: 10%; /* 왼쪽 여백을 자동으로 설정하여 오른쪽으로 밀기 */
  margin-right: 20px; /* 오른쪽 여백 추가 */
  display: block; /* 기본적으로 블록 요소로 처리 */
`;
export default Home;
