import React from 'react';
import styled from 'styled-components';
import banner from '../images/banner.png';
const Home = () => {
  return (
    <div>
        <div className="main-banner" >
        <Banner src={banner} alt="만두마켓 로고" ></Banner>
      </div>

        <SectionTitle className="popular-items-header">
        <h3>중고 거래 인기 매물</h3>
        </SectionTitle>

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
