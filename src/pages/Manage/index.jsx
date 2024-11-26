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
import Tab from "./Tab/Tab";
export default function ManagePage() {
  const [info, setInfo] = useState([]);
  const columnData = [
    {
      accessor: "createdAt",
      Header: "Created At",
    },
    {
      accessor: "completedSellPostCount",
      Header: "Completed SellPost Count",
    },
    {
      accessor: "likeSellPostCount",
      Header: "Completed SellPost Count",
    },
    {
      accessor: "email",
      Header: "Email",
    },
    {
      accessor: "name",
      Header: "Name",
    },
    {
      accessor: "nickName",
      Header: "Nickname",
    },
    {
      accessor: "passWord",
      Header: "PassWord",
    },
  ];

  const columns = useMemo(() => columnData, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/manage/member");
        setInfo(response.data.result);
      } catch (error) {
        console.error("Axios error:", error);
      }
    };
    fetchData();
  }, []);

  const data = useMemo(() => info, [info]);

  return (
    <Container>
      <Sidebar />
      <RightContainer>
        <Header>
          <Title>사용자관리</Title>
          <ButtonList>
            <Button>선택 삭제</Button>
            <Button>정렬기준</Button>
          </ButtonList>
        </Header>
        <Table columns={columns} data={data} />
      </RightContainer>
    </Container>
  );
}
