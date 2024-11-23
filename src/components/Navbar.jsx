// src/components/Navbar.js
import React, { useState } from 'react';
import * as S from './styles';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // 카테고리 열림/닫힘 상태

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // 기존 상태를 반전시켜서 토글
  };
  return (
    <S.NavbarContainer>
      <S.NavbarContainer2>
       <Link to="/">
        <S.Logo src={logo} alt="만두마켓 로고" />
      </Link>
      <S.SearchBar type="text" placeholder="어떤 물건을 찾으시나요?" />
      </S.NavbarContainer2>
 
      <S.NavbarContainer2>
    
      <S.CategoryButton onClick={toggleDropdown}>
      <i className="fas fa-bars icon"></i> 
      카테고리</S.CategoryButton>
      <S.CategoryDropdown isOpen={isOpen}>
        <S.CategoryItem>카테고리 1</S.CategoryItem>
        <S.CategoryItem>카테고리 2</S.CategoryItem>
        <S.CategoryItem>카테고리 3</S.CategoryItem>
        <S.CategoryItem>카테고리 4</S.CategoryItem>
      </S.CategoryDropdown>
      <S.Menu>
        <Link to='/login'><S.MenuButton>로그인/회원가입</S.MenuButton>
        </Link>
        
        <S.MenuButton>구매하기</S.MenuButton>
        <Link to='/Mypage'>
        <S.MenuButton>마이페이지</S.MenuButton>
        </Link>

      </S.Menu>
      </S.NavbarContainer2>
    </S.NavbarContainer>
  );
};

export default Navbar;
