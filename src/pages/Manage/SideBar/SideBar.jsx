import React, { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo_v2.png";
import { Fragment } from "react";

export default function Sidebar() {
  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClick = (index, path) => {
    setSelectedButton(index); // 선택된 버튼 상태 업데이트
    navigate(path); // 해당 경로로 이동
  };

  return (
<<<<<<< HEAD
    <S.SidebarContainer>
      <S.Logo src={logo} alt="만두마켓 로고" />
      <S.SidebarList>
        <S.SidebarButton
          key={1}
          isSelected={selectedButton === 1} // 선택된 상태 여부
          onClick={() => handleButtonClick(1, "/manage/dashboard")}
        >
          <span>대시보드</span>
        </S.SidebarButton>
        <S.SidebarButton
          key={2}
          isSelected={selectedButton === 2}
          onClick={() => handleButtonClick(2, "/manage//member")}
        >
          <span>사용자관리</span>
        </S.SidebarButton>
        <S.SidebarButton
          key={3}
          isSelected={selectedButton === 3}
          onClick={() => handleButtonClick(3, "/manage/report")}
        >
          <span>신고관리</span>
        </S.SidebarButton>
      </S.SidebarList>
      <S.MiniMenu>
        <S.MiniButton>관리자 모드</S.MiniButton>
        <S.MiniButton>로그아웃</S.MiniButton>
      </S.MiniMenu>
    </S.SidebarContainer>
=======
    <Fragment>
      <S.SidebarContainer>
        <S.Logo src={logo} alt="만두마켓 로고" />
        <S.SidebarList>
          <S.SidebarButton
            key={1}
            isSelected={selectedButton === 1} // 선택된 상태 여부
            onClick={() => handleButtonClick(1, "/manage/dashboard")}
          >
            <span>대시보드</span>
          </S.SidebarButton>
          <S.SidebarButton
            key={2}
            isSelected={selectedButton === 2}
            onClick={() => handleButtonClick(2, "/manage//member")}
          >
            <span>사용자관리</span>
          </S.SidebarButton>
          <S.SidebarButton
            key={3}
            isSelected={selectedButton === 3}
            onClick={() => handleButtonClick(3, "/manage/report")}
          >
            <span>신고관리</span>
          </S.SidebarButton>
        </S.SidebarList>
        <S.MiniMenu>
          <S.MiniButton>관리자 모드</S.MiniButton>
          <S.MiniButton>로그아웃</S.MiniButton>
        </S.MiniMenu>
      </S.SidebarContainer>
    </Fragment>
>>>>>>> master
  );
}
