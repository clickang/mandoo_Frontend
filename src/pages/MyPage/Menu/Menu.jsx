import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MenuList, MenuButton } from "./MenuStyles";
export default function Menu() {
  const [selected, setSelected] = useState(null);
  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <Fragment>
      <MenuList>
        <MenuButton isSelected={selected === 0} onClick={() => handleClick(0)}>
          찜한상품
        </MenuButton>
        <MenuButton isSelected={selected === 1} onClick={() => handleClick(1)}>
          판매중
        </MenuButton>
        <MenuButton isSelected={selected === 2} onClick={() => handleClick(2)}>
          판매완료
        </MenuButton>
      </MenuList>
    </Fragment>
  );
}
