import React, { Fragment, useEffect, useState } from "react";
import * as S from "./styles";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import SearchLogic from "./SearchLogic";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // 카테고리 열림/닫힘 상태
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태
  const [userInfo, setUserInfo] = useState({
    memberId: null,
    email: null,
    nickname: "",
  }); // 사용자 정보
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(""); // 검색어 상태 추가
  // 로컬스토리지에서 로그인 상태 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLogin(parsedUser.isLogin); // 로그인 상태 업데이트
      setUserInfo(parsedUser); // 사용자 정보 업데이트
    } else {
      setIsLogin(false);
      setUserInfo({ memberId: null, email: null, nickname: "" });
    }
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  // const toggleDropdown = () => {
  //   setIsOpen((prev) => !prev); // 기존 상태를 반전시켜서 토글
  //   console.log("isOpen?" ,isOpen);
  // };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/member/logout", {
        memberId: userInfo.memberId,
        email: userInfo.email,
      });

      // 로컬스토리지에서 사용자 정보 제거
      localStorage.removeItem("user");

      // 상태 초기화
      setIsLogin(false);
      setUserInfo({ memberId: null, email: null, nickname: "" });
      console.log("로그아웃?:", response.data);
      alert("로그아웃 되었습니다.");
      navigate("/"); // 로그인 성공 후 리디렉션
    } catch (error) {
      console.error(
        "로그아웃 실패:",
        error.response?.data?.message || error.message
      );
    }
  };
  const handleSearchChange = (e) => {
    setKeyword(e.target.value); // 입력값이 바뀔 때마다 상태 갱신
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/sellpost/search?keyword=${keyword}`); // 엔터 키 누르면 검색 실행
    }
  };

  return (
    <S.NavbarContainer>
      <S.NavbarContainer2>
        <Link to="/">
          <S.Logo src={logo} alt="만두마켓 로고" />
        </Link>
        <S.SearchBar
          type="text"
          placeholder="어떤 물건을 찾으시나요?"
          value={keyword}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
      </S.NavbarContainer2>

      <S.NavbarContainer3>
        <S.Category>
          <S.CategoryButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <i className="fas fa-bars icon"></i>
            카테고리
          </S.CategoryButton>
          {isOpen && <Dropdown />}
        </S.Category>
        <S.Menu>
          {!isLogin ? (
            <Link to="/login">
              <S.MenuButton>로그인/회원가입</S.MenuButton>
            </Link>
          ) : (
            <>
              <span>{userInfo.nickname}님, 안녕하세요!</span>
              <S.MenuButton onClick={handleLogout}>로그아웃</S.MenuButton>
            </>
          )}
          <Link to="/sellpost/write">
            <S.MenuButton>판매하기</S.MenuButton>
          </Link>
          <Link to="/Mypage">
            <S.MenuButton>마이페이지</S.MenuButton>
          </Link>
        </S.Menu>
      </S.NavbarContainer3>
    </S.NavbarContainer>
  );
};

function Dropdown() {
  return (
    <Fragment>
      <S.CategoryDropdown>
        <S.CategoryItem>수입 명품</S.CategoryItem>
        <S.CategoryItem>패션/의류</S.CategoryItem>
        <S.CategoryItem>뷰티</S.CategoryItem>
        <S.CategoryItem>출산/유아동</S.CategoryItem>
        <S.CategoryItem>가전제품</S.CategoryItem>
        <S.CategoryItem>카메라/캠코더</S.CategoryItem>
        <S.CategoryItem>모바일/탭플릿</S.CategoryItem>
        <S.CategoryItem>도서/음반/분류</S.CategoryItem>
        <S.CategoryItem>노트북/PC</S.CategoryItem>
      </S.CategoryDropdown>
    </Fragment>
  );
}

export default Navbar;
