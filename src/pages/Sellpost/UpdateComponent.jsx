import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams 추가
import axios from "axios";
import {
  Container,
  Form,
  Input,
  Label,
  TextArea,
  Button,
  Header,
  HorizontalField,
  Divider,
  CategoryContainer,
  CategoryButton,
  CheckboxContainer,
  CheckboxLabel,
  CheckboxInput,
  TextCount,
  ButtonWrapper,
} from "./styles";

export default function EditComponent() {
  const { sellPostId } = useParams(); // 게시글 ID 가져오기
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]); // 업로드된 이미지 상태
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택된 카테고리를 배열로 관리
  const [price, setPrice] = useState(""); // 판매 가격 상태
  const [isFree, setIsFree] = useState(false); // 무료 나눔 상태
  const [transactionMethods, setTransactionMethods] = useState({
    delivery: false,
    direct: false,
  }); // 거래 방법 상태
  const [region, setRegion] = useState({
    city: "",
    gu: "",
    dong: "",
  });

  // 게시글 데이터 로드
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/sellpost/read/${sellPostId}`);
        const postData = response.data.result;

        // 폼 필드 채우기
        setTitle(postData.title);
        setContent(postData.description);
        setPrice(postData.price === "무료 나눔" ? "" : postData.price);
        setIsFree(postData.price === "무료 나눔");
        setSelectedCategories(postData.categories.map((category) => category.id));
        setTransactionMethods({
          delivery: postData.transactionMethods.includes("delivery"),
          direct: postData.transactionMethods.includes("direct"),
        });
        setRegion({
          city: postData.city,
          gu: postData.gu,
          dong: postData.dong,
        });
        setUploadedImages(postData.images || []); // 기존 이미지를 초기 값으로 설정
      } catch (error) {
        console.error("게시글 로드 중 오류 발생:", error);
        alert("게시글 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchPost();
  }, [sellPostId]);

  // 거래 방법 체크박스 상태 변경
  const handleTransactionMethodChange = (method) => {
    setTransactionMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해 주세요!");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("카테고리를 선택해 주세요!");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해 주세요!");
      return;
    }

    if (!region.city || !region.gu || !region.dong) {
      alert("지역을 선택해 주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", content);
    formData.append("price", isFree ? "무료 나눔" : price);
    formData.append("city", region.city);
    formData.append("gu", region.gu);
    formData.append("dong", region.dong);

    // 카테고리 추가
    selectedCategories.forEach((categoryId) =>
      formData.append("categoryIds[]", categoryId)
    );

    // 거래 방법 추가
    Object.keys(transactionMethods)
      .filter((method) => transactionMethods[method])
      .forEach((method) => formData.append("transactionMethods[]", method));

    // 이미지 추가
    uploadedImages.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.put(`/sellpost/update/${sellPostId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("수정된 게시물:", response.data);
      alert("게시물이 성공적으로 수정되었습니다!");
      navigate(`/sellpost/read/${sellPostId}`); // 수정된 게시글 상세 페이지로 이동
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Header>게시글 수정</Header>
      <Divider />

      <Form onSubmit={handleSubmit}>
        {/* 제목, 카테고리, 이미지, 내용 등 동일한 폼 */}
        {/* ... */}
        <HorizontalField>
          <Label>제목</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />
        </HorizontalField>
        {/* 나머지 필드도 동일 */}
        <ButtonWrapper>
          <Button>수정 완료</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
