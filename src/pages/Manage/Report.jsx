import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./SideBar/SideBar";
import Dropdown from "./DropDown/DropDown";
import axios from "axios";

import {
  Button,
  ButtonList,
  Container,
  Header,
  RightContainer,
  Title,
} from "./styles";
import Table from "./Table/Table";
import Tab from "./Tab/Tab";
export default function ReportPage() {
  const [info, setInfo] = useState([]);
  const [currentTab, setCurrentTab] = useState("comment");
  const [deleteId, setDeleteId] = useState([]);
  const [order, setOrder] = useState("id");

  const commentColumn = [
    { accessor: "commentReportId", Header: "ID" },
    { accessor: "createdAt", Header: "Created At" },
    { accessor: "status", Header: "Status" },
    { accessor: "commentId", Header: "Comment ID" },
    { accessor: "memberId", Header: "Member ID" },
    { accessor: "writerId", Header: "Writer ID" },
    { accessor: "content", Header: "Content" },
    { accessor: "sellPostId", Header: "SellPost ID" },
  ];

  const sellPostColumn = [
    { accessor: "postReportId", Header: "ID" },
    { accessor: "createdAt", Header: "Created At" },
    { accessor: "sellPostId", Header: "SellPost ID" },
    { accessor: "memberId", Header: "Member ID" },
    { accessor: "writerId", Header: "Writer ID" },
    { accessor: "title", Header: "Title" },
    { accessor: "content", Header: "Content" },
  ];

  // Tab에 따라 동적으로 columnData 설정
  const columns = useMemo(() => {
    return currentTab === "comment" ? commentColumn : sellPostColumn;
  }, [currentTab]);

  const fetchData = async (orderBy) => {
    try {
      const url =
        currentTab === "comment"
          ? `/manage/report/comment?order=${orderBy}`
          : `/manage/report/sellPost?order=${orderBy}`;
      const response = await axios.get(url);
      setInfo(response.data.result);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  // 초기 데이터 로드 및 order 변경 시 데이터 로드
  useEffect(() => {
    fetchData(order); // order가 변경될 때마다 데이터 요청
    console.log(order);
  }, [order, currentTab]); // order와 currentTab에 변화가 있을 때마다 호출

  const data = useMemo(() => info, [info]);

  const handleDropdownSelect = (value) => {
    setOrder(value); // 선택된 정렬 기준 업데이트
    fetchData(value); // 새로운 정렬 기준으로 데이터 로드
  };
  // DELETE 요청 처리 함수
  const handleDelete = async () => {
    if (deleteId.length === 0) {
      alert("선택된 사용자가 없습니다.");
      return;
    }

    try {
      //delete ID마다 DELETE 요청 전송
      await Promise.all(
        deleteId.map(async (id) => {
          const response = await axios.delete(
            `/manage/report/${currentTab}?${currentTab}Id=${deleteId}`
          );
          return response;
        })
      );

      alert("선택된 사용자가 삭제되었습니다.");

      // 삭제 성공 후, UI 갱신
      setInfo((prevInfo) =>
        prevInfo.filter((item) => !deleteId.includes(item[`${currentTab}Id`]))
      );
      setDeleteId([]); // 선택된 ID 초기화
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 실패. 다시 시도해주세요.");
    }
  };
  return (
    <Container>
      <Sidebar initialSelectedButton={3} />
      <RightContainer>
        <Header>
          <Title>신고 관리</Title>
          <ButtonList>
            <Button onClick={handleDelete}>선택 삭제</Button>
            <Dropdown onSelect={handleDropdownSelect} />
          </ButtonList>
        </Header>
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Table
          checkBoxExist={true}
          columns={columns}
          data={data}
          onSelectedRowsChange={(selectedRows) => {
            const selectedIds = selectedRows.map(
              (row) => row.original[`${currentTab}Id`]
            );
            setDeleteId(selectedIds);
          }}
        />
      </RightContainer>
    </Container>
  );
}