import React, { useMemo } from "react";
import Sidebar from "./SideBar/SideBar";
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
  const columnData = [
    {
      accessor: "email",
      Header: "Email",
    },
    {
      accessor: "walletID",
      Header: "Wallet ID",
    },
    {
      accessor: "coin_list",
      Header: "Wallet Balance",
    },
    {
      accessor: "created_at",
      Header: "Created At",
    },
    {
      accessor: "edited_at",
      Header: "Edited At",
    },
  ];

  const columns = useMemo(() => columnData, []);

  const data = useMemo(
    () => [
      {
        email: "이메일이에용",
        walletID: "아이디에용",
        created_at: "2021-08-03 01:14:47",
        edited_at: "2021-08-03 01:15:49",
        coin_list: ["TRV", "BTC", "BCH", "ETH"],
      },
    ],
    []
  );

  // const [info, setInfo] = useState();

  // const getTamWallet = () => {
  //   data.getTamWallet().then(item => setInfo(item));
  // };

  // const data = useMemo(() => info, [info])

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
<<<<<<< HEAD
        {/* <Table columns={columns} data={data} /> */}
        <Tab />
=======
        <Table columns={columns} data={data} />
>>>>>>> master
      </RightContainer>
    </Container>
  );
}
