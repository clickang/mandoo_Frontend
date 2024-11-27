import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./SideBar/SideBar";
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
import Dropdown from "./DropDown/DropDown";

export default function MemberPage() {
  const [info, setInfo] = useState([]);
  const [memberId, setMemberId] = useState([]); // 선택된 멤버 ID 상태
  const [order, setOrder] = useState("id");
  const columnData = [
    { accessor: "memberId", Header: "ID" },
    { accessor: "createdAt", Header: "Created At" },
    { accessor: "completedSellPostCount", Header: "Completed SellPost Count" },
    { accessor: "likeSellPostCount", Header: "Like SellPost Count" },
    { accessor: "email", Header: "Email" },
    { accessor: "name", Header: "Name" },
    { accessor: "nickName", Header: "Nickname" },
    { accessor: "passWord", Header: "Password" },
  ];

  const columns = useMemo(() => columnData, []);

  // 데이터 가져오기 함수
  const fetchData = async (orderBy) => {
    try {
      const response = await axios.get(`/manage/member?order=${orderBy}`);
      setInfo(response.data.result);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchData(order);
  }, [order]);

  const data = useMemo(() => info, [info]);

  const handleDropdownSelect = (value) => {
    setOrder(value); // 선택된 정렬 기준 업데이트
    fetchData(value); // 새로운 정렬 기준으로 데이터 로드
  };
  // DELETE 요청 처리 함수
  const handleDelete = async () => {
    if (memberId.length === 0) {
      alert("선택된 사용자가 없습니다.");
      return;
    }

    try {
      // 멤버 ID마다 DELETE 요청 전송
      await Promise.all(
        memberId.map(async (id) => {
          const response = await axios.delete(
            `/manage/member?memberId=${memberId}`
          );
          return response;
        })
      );

      alert("선택된 사용자가 삭제되었습니다.");

      // 삭제 성공 후, UI 갱신
      setInfo((prevInfo) =>
        prevInfo.filter((member) => !memberId.includes(member.memberId))
      );
      setMemberId([]); // 선택된 ID 초기화
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 실패. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Sidebar initialSelectedButton={2} />
      <RightContainer>
        <Header>
          <Title>사용자관리</Title>
          <ButtonList>
            <Button onClick={handleDelete}>선택 삭제</Button>
            <Dropdown onSelect={handleDropdownSelect} />
          </ButtonList>
        </Header>
        <Table
          columns={columns}
          data={data}
          onSelectedRowsChange={(selectedRows) => {
            const selectedIds = selectedRows.map(
              (row) => row.original.memberId
            );
            setMemberId(selectedIds); // 선택된 ID 상태 업데이트
          }}
        />
      </RightContainer>
    </Container>
  );
}
