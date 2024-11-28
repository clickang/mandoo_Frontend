import React, { useState } from "react";
import ImageUpload from "./ImageUpload/ImageUpload";
import RegionSelect from "./RegionSelect/RegionSelect";
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
    "수입 명품",
    "패션의류",
    "뷰티",
    "출산/유아동",
    "가전제품",
    "카메라/캠코더",
    "모바일/탬플릿",
    "도서/음반/문류",
    "노트북/PC",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // 이미 선택된 경우 제거
        : [...prev, category] // 선택되지 않은 경우 추가
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
    district: "",
    neighborhood: "",
  });

  const handleRegionChange = (region) => {
    console.log("선택된 지역:", region);
    setRegion(region);
  };

//   const handleRegionChange = (newRegion) => {
//     setRegion(newRegion);
//   };

  

  const handleSubmit = (e) => {
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
    if (!region.city || !region.district || !region.neighborhood) {
        alert("지역을 선택해 주세요!");
        return;
      }
  
      const postData = {
        title,
        content,
        categories: selectedCategories,
        price: isFree ? "무료 나눔" : price,
        transactionMethods: Object.keys(transactionMethods).filter(
          (method) => transactionMethods[method]
        ),
        region: `${region.city} ${region.district} ${region.neighborhood}`,
      };
  
      console.log("게시물 데이터:", postData);
      alert("게시물이 작성되었습니다!");
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
                key={category}
                type="button"
                isSelected={selectedCategories.includes(category)}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
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
