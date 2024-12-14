import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Title from "./Title/Title";
import Menu from "./Menu/Menu";
import {
  ButtonContainer,
  MyPageContainer,
  SellPostButton,
  SellPostButtonContainer,
  SellPostCount,
  SubContainer,
} from "./styles";
import { useInView } from "react-intersection-observer";

export default function MyPage() {
  return (
    <Fragment>
      <MyPageContainer>
        <Title />
        <SubContainer>
          <Menu />
          <ButtonContainer>
            <SellPostCount>총1개</SellPostCount>
            <SellPostButtonContainer>
              <SellPostButton>삭제</SellPostButton>
              <SellPostButton>게시글 수정</SellPostButton>
            </SellPostButtonContainer>
          </ButtonContainer>
        </SubContainer>
        {/* <S.CardContainer>
          {posts?.pages.map((page) => {
            return page.result.content.map((post, _) => (
              <Card key={post.sellPostId} post={post} />
            ));
          })}
        </S.CardContainer> */}
      </MyPageContainer>
    </Fragment>
  );
}
