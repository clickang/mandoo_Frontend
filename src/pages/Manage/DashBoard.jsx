import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./SideBar/SideBar";
import Chart from "./Chart/Chart";
import GridLayout from "react-grid-layout";
import axios from "axios";
import * as S from "./styles";
import Table from "./Table/Table";

export default function DashBoardPage() {
  const [sellPostCount, setSellPostCount] = useState([]);
  const [categoryRatio, setCategoryRatio] = useState([]);
  const [dateView, setDateView] = useState([]);
  const initialData = [];
  // 레이아웃 설정
  const layout = [
    { i: "chart1", x: 0, y: 0, w: 2, h: 2 },
    { i: "chart2", x: 2, y: 0, w: 2, h: 4 },
    { i: "chart3", x: 0, y: 2, w: 2, h: 2 },
    { i: "chart4", x: 2, y: 2, w: 2, h: 2 },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("/manage/dashboard");
      // categoryRatio 데이터 변환
      const transformedSellPostCount = [
        {
          id: "Sell Posts", // 라인 차트의 이름 (임의 설정 가능)
          data: response.data.result.sellPostCount.map((item) => ({
            x: item.date, // x축 값: 날짜
            y: item.sellPostCount, // y축 값: 게시물 수
          })),
        },
      ];
      setSellPostCount(transformedSellPostCount);

      const transformedCategoryRatio = response.data.result.categoryRatio.map(
        (item) => ({
          id: item.name, // 기존 categoryName -> id
          value: item.ratio, // 기존 percentage -> value
          label: item.categoryCount, // Nivo에서 label은 선택 사항이지만 추가 가능
        })
      );
      setCategoryRatio(transformedCategoryRatio);
      setDateView(response.data.result.dateView);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchData();
  }, []);

  const columnData = [
    { accessor: "date", Header: "일자" },
    { accessor: "subscriber", Header: "가입자" },
    { accessor: "sellPost", Header: "게시글" },
    { accessor: "comment", Header: "댓글" },
  ];
  const columns = useMemo(() => columnData, []);
  return (
    <S.Container>
      <Sidebar initialSelectedButton={1} />
      <S.RightContainer>
        <S.DashboardContainer>
          <S.StyledGridLayout
            layout={layout}
            cols={4} // 총 열의 수
            rowHeight={150} // 한 행의 높이 (px)
            width={1200} // 전체 그리드 너비 (px)
            draggableHandle=".drag-handle"
            margin={[30, 30]}
          >
            <div key="chart1" className="grid-item">
              <Chart chartType={"line"} chartData={sellPostCount} />
            </div>
            <div key="chart3" className="grid-item">
              <Chart chartType={"pie"} chartData={categoryRatio} />
            </div>
            <div
              key="chart2"
              className="grid-item"
              style={{ padding: "16px", boxSizing: "border-box" }}
            >
              <Table checkBoxExist={false} columns={columns} data={dateView} />
            </div>
            {/* <div key="chart4" className="grid-item">
                <Chart chartType={"line"} />
              </div> */}
          </S.StyledGridLayout>
        </S.DashboardContainer>
      </S.RightContainer>
    </S.Container>
  );
}
