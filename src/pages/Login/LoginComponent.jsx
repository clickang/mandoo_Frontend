import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import axios from "axios";

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
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 체크박스 상태
  const navigate = useNavigate();
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // 회원가입
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    nickname: "",
    status: "",
    confirmPassword: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const response = await axios.post("/member/login", loginData);
      console.log("로그인?:", response.data);
      if (response.data.isSuccess) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            memberId: response.data.result?.memberId,
            nickname: response.data.result?.nickname,
            email: response.data.result?.email,
            isLogin: true,
          })
        );
        navigate("/");
      } // 로그인 성공 후 리디렉션
    } catch (error) {
      if (error.response) {
        // 서버에서 반환한 에러
        console.error("로그인 실패:", error.response.data.message);
      } else if (error.request) {
        // 요청이 보내졌으나 응답이 없음
        console.error("서버 응답이 없습니다.");
      } else {
        // 요청 설정 중 에러 발생
        console.error("오류 발생:", error.message);
      }
      setLoginError(error.response?.data?.message || "로그인 실패");
    }
  };

  // 회원가입 핸들러
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    setPasswordError(null);

    try {
      const { confirmPassword, ...dataToSend } = registerData;
      const response = await axios.post("/member/signup", dataToSend);

      navigate("/"); // 회원가입 성공 후 로그인 페이지로 리디렉션
    } catch (error) {
      if (error.response) {
        // 서버에서 반환한 에러
        console.error("회원가입 실패:", error.response.data.message);
      } else if (error.request) {
        // 요청이 보내졌으나 응답이 없음
        console.error("서버 응답이 없습니다.");
      } else {
        // 요청 설정 중 에러 발생
        console.error("오류 발생:", error.message);
      }
      setRegisterError(error.response?.data?.message || "회원가입 실패");
    }
  };

  useEffect(() => {
    if (registerData.password !== registerData.confirmPassword) {
      setPasswordError("비밀번호가 다릅니다");
    } else {
      setPasswordError(null); // 비밀번호 일치 시 에러 메시지 제거
    }
  }, [registerData.password, registerData.confirmPassword]);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };
  // 관리자 체크박스 변경 핸들러
  const handleAdminChange = (e) => {
    const checked = e.target.checked;
    setIsAdmin(checked);

    // 관리자 체크박스를 클릭한 경우, registerData에 status를 'manager'로 설정
    if (checked) {
      setRegisterData((prev) => ({ ...prev, status: "manager" }));
    } else {
      setRegisterData((prev) => ({ ...prev, status: "user" }));
    }
  };

  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="만두마켓 로고" />
      </Link>
      <Tabs>
        <Tab
          active={activeTab === "login"}
          onClick={() => setActiveTab("login")}
        >
          로그인
        </Tab>
        <Tab
          active={activeTab === "register"}
          onClick={() => setActiveTab("register")}
        >
          회원가입
        </Tab>
      </Tabs>
      {activeTab === "login" ? (
        <Form onSubmit={handleLoginSubmit}>
          <Classify>아이디</Classify>
          <input
            type="email"
            name="email"
            placeholder="아이디 또는 이메일"
            value={loginData.email}
            onChange={handleChange(setLoginData)}
            required
          />
          <Classify>비밀번호</Classify>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={loginData.password}
            onChange={handleChange(setLoginData)}
            required
          />
          {loginError && <div style={{ color: "red" }}>{loginError}</div>}
          <button type="submit">로그인</button>
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
            아이디 찾기 / 비밀번호 찾기
          </div>
        </Form>
      ) : (
        <Form onSubmit={handleRegisterSubmit}>
          <Classify>닉네임</Classify>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={registerData.nickname}
            onChange={handleChange(setRegisterData)}
            required
          />
          <Classify>이메일</Classify>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={registerData.email}
            onChange={handleChange(setRegisterData)}
            required
          />
          <Classify>비밀번호</Classify>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={registerData.password}
            onChange={handleChange(setRegisterData)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={registerData.confirmPassword}
            onChange={handleChange(setRegisterData)}
            required
          />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              padding: "0",
              marginLeft: "230px",
              gap: "0px",
              flexWrap: "nowrap",
            }}
          >
            <input
              type="checkbox"
              id="admin"
              checked={isAdmin}
              onChange={handleAdminChange}
              style={{ alignItems: "flex-end", margin: "0" }}
            />
            <label htmlFor="admin" style={{ whiteSpace: "nowrap" }}>
              관리자 로그인
            </label>
          </div>
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
          {registerError && <div style={{ color: "red" }}>{registerError}</div>}
          <button type="submit">회원가입</button>
        </Form>
      )}
    </Container>
  );
};

export default LoginRegister;
