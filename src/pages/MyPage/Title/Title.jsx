import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import profile from "../../../images/profile.png";
import * as S from "./TitleStyles";
export default function Title() {
  return (
    <Fragment>
      <S.ProfileContainer>
        <S.ProfileImg src={profile} alt="만두마켓 로고" />
        <S.TitleContainer>
          <S.Title>SOM</S.Title>
          <S.MiniTitleContainer>
            <S.MiniTitle>상점 오픈일</S.MiniTitle>
            <S.MiniTitle>test</S.MiniTitle>
          </S.MiniTitleContainer>
        </S.TitleContainer>
      </S.ProfileContainer>
    </Fragment>
  );
}
