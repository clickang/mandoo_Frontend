import React, { Fragment, useState, useMemo } from "react";
import * as S from "./TabStyles";
import Table from "../Table/Table";
const MenuTab = ({ currentTab, setCurrentTab }) => {
  const TAB_ARR = [
    {
      name: "comment",
      title: "댓글 신고",
    },
    {
      name: "sellPost",
      title: "게시글 신고",
    },
  ];

  return (
    <Fragment>
      <S.TabList>
        {TAB_ARR.map((tab) => (
          <S.TabButton
            key={tab.name}
            isActive={currentTab === tab.name}
            onClick={() => setCurrentTab(tab.name)}
          >
            {tab.title}
          </S.TabButton>
        ))}
      </S.TabList>
    </Fragment>
  );
};

export default MenuTab;

