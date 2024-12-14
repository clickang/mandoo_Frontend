import React, { useState } from "react";
import ImageUpload from "./ImageUpload/ImageUpload";
import RegionSelect from "./RegionSelect/RegionSelect";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
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

import axios from "axios";

export default function WriteComponent() {
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

  const handleImageUpload = (images) => {
    setUploadedImages(images); // 이미지 리스트 업데이트
  };

  const categories = [
    { id: 1, name: "수입 명품" },
    { id: 2, name: "패션의류" },
    { id: 3, name: "뷰티" },
    { id: 4, name: "출산/유아동" },
    { id: 5, name: "가전제품" },
    { id: 6, name: "카메라/캠코더" },
    { id: 7, name: "모바일/탬플릿" },
    { id: 8, name: "도서/음반/문류" },
    { id: 9, name: "노트북/PC" },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // 이미 선택된 경우 제거
        : [...prev, categoryId] // 선택되지 않은 경우 추가
    );
  };

  const handleTransactionMethodChange = (method) => {
    setTransactionMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };
  const [region, setRegion] = useState({
    city: "",
    gu: "",
    dong: "",
  });

  const handleRegionChange = (region) => {
    console.log("선택된 지역:", region);
    setRegion(region);
  };

  

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
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

    // 게시물 데이터 객체
    if (!region.city || !region.gu || !region.dong) {
        alert("지역을 선택해 주세요!");
        return;
      }

      const storedUser = localStorage.getItem("user"); 
      const parsedUser = JSON.parse(storedUser); // JSON 문자열을 객체로 변환
      const memberId = parsedUser.memberId; // memberId 가져오기
      if (!memberId) {
        alert("로그인이 필요합니다!"); 
      }
      console.log("멤버 ID:", memberId);
      console.log("선택된 지역:", region);
      
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", content);
      formData.append("price", isFree ? "무료 나눔" : price);
      formData.append("city", region.city); // city 추가
      formData.append("gu", region.gu);     // gu 추가
      formData.append("dong", region.dong); // dong 추가
      formData.append("memberId", memberId); // 멤버 ID 추가

       // 카테고리 아이디를 FormData에 추가
      selectedCategories.forEach((categoryId) =>
        formData.append("categoryIds[]", categoryId)
      );
      Object.keys(transactionMethods)
        .filter((method) => transactionMethods[method])
        .forEach((method) => formData.append("transactionMethods[]", method));
      uploadedImages.forEach((image) => formData.append("images", image)); // 이미지 추가

      console.log("FormData 내용:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    
      try {
        const response = await axios.post("/sellpost/write", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("서버 응답 데이터:", response.data);
        alert("게시물이 성공적으로 등록되었습니다!");
        navigate("/"); // '/'는 홈 화면 경로 (필요에 따라 변경 가능)
      } catch (error) {
        console.error("게시물 등록 중 오류 발생:", error);
        alert("게시물 등록에 실패했습니다. 다시 시도해 주세요.");
      }
      
    };

  return (
    <Container>
      <Header>상품 등록</Header>
      <Divider />

      <Form onSubmit={handleSubmit}>
        {/* 이미지 업로드 */}
        <HorizontalField>
          <Label>
            <p>상품 이미지</p>
            <p>({uploadedImages.length}/12)</p>
          </Label>
          <ImageUpload onImageChange={handleImageUpload} />
        </HorizontalField>

        {/* 제목 입력 */}
        <HorizontalField>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="상품명을 입력해 주세요"
          />
        </HorizontalField>

        {/* 카테고리 선택 */}
        <HorizontalField>
          <Label>카테고리</Label>
          <CategoryContainer>
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                type="button"
                isSelected={selectedCategories.includes(category.id)}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </CategoryButton>
            ))}
          </CategoryContainer>

        </HorizontalField>

        {/* 지역 선택 */}
        <HorizontalField>
          <Label>지역</Label>
          <RegionSelect onRegionChange={handleRegionChange} />
        </HorizontalField>

        {/* 판매 가격 */}
        <HorizontalField>
          <Label>판매 가격</Label>
          <Input
            type="number"
            value={isFree ? "" : price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
            disabled={isFree}
          />
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              checked={isFree}
              onChange={() => setIsFree(!isFree)}
            />
            무료 나눔
          </CheckboxLabel>
        </HorizontalField>

        {/* 거래 방법 */}
        <HorizontalField>
          <Label>거래 방법</Label>
          <CheckboxContainer>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={transactionMethods.delivery}
                onChange={() => handleTransactionMethodChange("delivery")}
              />
              택배 거래
            </CheckboxLabel>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={transactionMethods.direct}
                onChange={() => handleTransactionMethodChange("direct")}
              />
              직거래
            </CheckboxLabel>
          </CheckboxContainer>
        </HorizontalField>

        {/* 내용 입력 */}
        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="거래 내용을 적어주세요"
        />

        <TextCount>{`${content.length}/1000`}</TextCount>

        {/* 제출 버튼 */}
        <ButtonWrapper>
            <Button>등록</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
