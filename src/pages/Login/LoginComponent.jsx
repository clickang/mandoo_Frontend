import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  text-align: center;
`;


export const Logo = styled.img`
  width: 150px;
  height: auto;
`;


const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  background: #f5f5f5;
  border-radius: 10px;
`;

const Tab = styled.div`
  flex: 1;
  padding: 10px 0;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-radius: 5px 5px 0 0;
  border: ${(props) => (props.active ? "2px solid #ccc" : "1px solid #ccc")};
  background: ${(props) => (props.active ? "#fff" : "transparent")};
  border-bottom: ${(props) => (props.active ? "none" : "1px solid #ccc")};
`;
const Classify = styled.p`
  margin: 0;
  padding: 0 10px;
  text-align: left;
  font-weight: bold; /* 굵은 글씨 */
  font-size: 14px; /* 적절한 크기로 설정 */
  color: #333; /* 더 진한 색상 */
`;
const Form = styled.form`
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: -5px;

  input {
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    background: #b09991;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #a77c64;
    }
  }
`;

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="만두마켓 로고" />
      </Link>
      <Tabs>
        <Tab active={activeTab === "login"} onClick={() => setActiveTab("login")}>
          로그인
        </Tab>
        <Tab active={activeTab === "register"} onClick={() => setActiveTab("register")}>
          회원가입
        </Tab>
      </Tabs>
      {activeTab === "login" ? (
        <Form>
          <Classify>아이디</Classify>
          <input type="email" placeholder="아이디 또는 이메일" required />
          <Classify>비밀번호</Classify>
          <input type="password" placeholder="비밀번호" required />
          <button type="submit">로그인</button>
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
            아이디 찾기 / 비밀번호 찾기
          </div>
          <div style={{marginTop: "20px", display: "flex",padding: "0",  marginLeft:"230px",gap: "0px",flexWrap: "nowrap" }}>
         <input type="checkbox" id="admin" style={{ alignItems: "flex-end",margin:"0" }} />
         <label htmlFor="admin" style={{ whiteSpace: "nowrap" }}>관리자 로그인</label>
  </div>
        </Form>
      ) : (
        <Form>
           <Classify>닉네임</Classify>
          <input type="text" placeholder="닉네임" required />
          <Classify>이메일</Classify>
          <input type="email" placeholder="이메일" required />
          <Classify>비밀번호</Classify>
          <input type="password" placeholder="비밀번호" required />
          <input type="password" placeholder="비밀번호 확인" required />
          <button type="submit">회원가입</button>
        </Form>
      )}
    </Container>
  );
};

export default LoginRegister;
