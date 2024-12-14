import { Button } from "../styles";
import * as S from "./DropDownStyles";
import React, { Fragment, useState } from "react";

function Dropdown({ onSelect }) {
  const [view, setView] = useState(false);

  const handleSelet = (value) => {
    setView(false);
    onSelect(value);
  };

  return (
    <S.ButtonContainer>
      <S.MainButton
        onClick={() => {
          setView(!view);
        }}
      >
        정렬기준 {view ? "⌃" : "⌄"}
      </S.MainButton>
      {view && (
        <S.DropButtonList>
          <S.DropButton onClick={() => handleSelet("id")}>아이디</S.DropButton>
          <S.DropButton onClick={() => handleSelet("created_at")}>
            생성날짜
          </S.DropButton>
        </S.DropButtonList>
      )}
    </S.ButtonContainer>
  );
}

export default Dropdown;
