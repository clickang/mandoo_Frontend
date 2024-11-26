import React, { Fragment, useState, useMemo } from "react";
import * as S from "./TabStyles";
import Table from "../Table/Table";
const MenuTab = () => {
  const [currentTab, setCurrentTab] = useState("First");
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
  return (
    <Fragment>
      <S.TabList>
        {TAB_ARR.map((tab, index) => (
          <S.TabButton key={index} onClick={() => setCurrentTab(tab)}>
            {tab}
          </S.TabButton>
        ))}
      </S.TabList>
      <Table columns={columns} data={data} />
      {/* <div className="contents">{MAPPING_OBJ[currentTab]}</div> */}
    </Fragment>
  );
};

export default MenuTab;

const TAB_ARR = ["First", "Second"];

const MAPPING_OBJ = {
  First: <S.Test />,
  Second: <S.Test />,
};
