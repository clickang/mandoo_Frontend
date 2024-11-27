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

export default function DashBoardPage() {
  return (
    <Container>
      <Sidebar />
      <RightContainer></RightContainer>
    </Container>
  );
}
