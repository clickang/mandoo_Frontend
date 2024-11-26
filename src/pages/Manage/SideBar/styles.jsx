import styled from "styled-components";
import React, { useState } from "react";

export const SidebarContainer = styled.nav`
  background-color: #383737;
  width: 30vh;
  flex-direction: column; /* 세로 정렬 */
  display: flex;
  padding-bottom: 30px;
  height: 100%;
`;

export const SidebarList = styled.ul`
  width: 100%;
  padding-inline-start: 0;
`;

export const SidebarButton = styled.li`
  color: white;
  list-style-type: none;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 15px;
  background-color: ${(props) =>
    props.isSelected ? "#344BFD" : "#383737"}; /* 선택 여부에 따른 배경색 */
  transition: background-color 0.3s ease, color 0.3s ease; /* 배경색과 글자색의 전환 추가 */
  cursor: pointer; /* 클릭 가능한 느낌을 주기 위해 포인터 추가 */
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
  padding: 15px;
  padding-left: 18px;
`;

export const MiniMenu = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: auto;
`;

export const MiniButton = styled.div`
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 10px;
`;
