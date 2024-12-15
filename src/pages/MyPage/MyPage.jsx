import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Title from "./Title/Title";
import Menu from "./Menu/Menu";
import MyCard from "./MyCard/MyCard.jsx";
import footer from "../../images/footer.png";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  ButtonContainer,
  Footer,
  MyPageContainer,
  SellPostButton,
  SellPostButtonContainer,
  SellPostCount,
  SubContainer,
  CardContainer,
} from "./styles";
import { useGetMyPosts } from "../../hooks/useGetMyPosts.js";
import { useInView } from "react-intersection-observer";

const MyPage = () => {
  const [getURL, setGetURL] = useState("/mypage/like");
  const [selected, setSelected] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [delButtonActive, setDelButtonActive] = useState(false);
  const [delButtonContent, setDelButtonContent] = useState("삭제");
  const [updateButtonActive, setUpdateButtonActive] = useState(false);
  const [updateButtonContent, setUpdateButtonContent] = useState("게시글 수정");
  const {
    data: posts = { pages: [] },
    isLoading,
    isFetching,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useGetMyPosts(getURL);

  //   useEffect(() => {}, [posts]);

  useEffect(() => {
    if (getURL) {
      fetchNextPage();
    }
  }, [getURL, fetchNextPage]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const delButtonClick = async () => {
    if (delButtonActive) {
      // 삭제 버튼이 활성화 상태일 때 선택된 카드 삭제
      if (selectedCardId) {
        try {
          await DeleteData(selectedCardId); // 데이터를 삭제하는 fetchData 호출
          alert("삭제되었습니다."); // 성공 알림 표시
          setSelectedCardId(null); // 삭제 후 선택된 카드 초기화
        } catch (error) {
          alert("삭제에 실패했습니다. 다시 시도해주세요."); // 실패 알림 표시
          console.error("삭제 오류:", error);
        }
      } else {
        alert("삭제할 항목을 선택해주세요."); // 선택된 카드가 없을 때 알림
      }
    } else {
      // 삭제 버튼이 비활성화 상태일 때
      setDelButtonContent("선택 완료");
      setDelButtonActive(true);
    }
  };

  const navigate = useNavigate();
  const updateButtonClick = async () => {
    if (updateButtonActive) {
      if (selectedCardId) {
        navigate(`/sellpost/update/${selectedCardId}`);
      }
    } else {
      setUpdateButtonContent("선택 완료");
      setUpdateButtonActive(true);
    }
  };

  const DeleteData = async (sellPostId) => {
    try {
      const response = await axios.delete(
        `/mypage/delete?sellpostId=${sellPostId}`
      );
      console.log("삭제 성공:", response.data);
    } catch (error) {
      console.error("Axios error:", error);
      throw error; // 에러를 상위로 전달
    }
  };

  const UpdateData = async (sellPostId) => {
    
  };

  return (
    <Fragment>
      <MyPageContainer>
        <Title />
        <SubContainer>
          <Menu
            selected={selected}
            setSelected={setSelected}
            setGetURL={setGetURL}
          />
          <ButtonContainer>
            <SellPostCount>총1개</SellPostCount>
            <SellPostButtonContainer>
              <SellPostButton onClick={() => delButtonClick()}>
                {delButtonContent}
              </SellPostButton>
              <SellPostButton onClick={() => updateButtonClick()}>
                {updateButtonContent}
              </SellPostButton>
            </SellPostButtonContainer>
          </ButtonContainer>
          <CardContainer>
            {posts?.pages.map((page) => {
              return page.result.map((post, _) => (
                <MyCard
                  key={post.sellPostId}
                  post={post}
                  selectedCardId={selectedCardId}
                  setSelectedCardId={setSelectedCardId}
                  delButtonAcitve={delButtonActive}
                  updateButtonActive={updateButtonActive}
                />
              ));
            })}
          </CardContainer>
        </SubContainer>
        <Footer src={footer} alt="foot_img" />
      </MyPageContainer>
    </Fragment>
  );
};

export default MyPage;