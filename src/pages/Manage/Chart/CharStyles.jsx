import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

export const ChartContainer = styled.div`
  height: 100%; // 부모 높이와 비율 유지
  width: 100%; // 부모 너비와 비율 유지
  minheight: 300px; // 최소 높이 설정
  minwidth: 300px; // 최소 너비 설정
  display: flex; // Flexbox로 컨텐츠 중앙 배치
  justifycontent: center;
  alignitems: center;
  border: 1px solid #ddd; // 디버깅용으로 경계선 추가
  border-radius: 8px;
  background-color: #ffffff; // 배경색 설정
`;
