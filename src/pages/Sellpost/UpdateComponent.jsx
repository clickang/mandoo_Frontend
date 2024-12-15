import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload/ImageUpload";
import RegionSelect from "./RegionSelect/RegionSelect";
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
  const [status, setStatus] = useState(0); // 거래 상태: 0(거래 중), 1(거래 완료)

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
        setSelectedCategories(
          postData.categories.map((category) => category.id)
        );
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
        setStatus(postData.status != null ? postData.status : 0);
      } catch (error) {
        console.error("게시글 로드 중 오류 발생:", error);
        // alert("게시글 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchPost();
  }, [sellPostId]);

  const handleImageUpload = (images) => {
    setUploadedImages(images); // 이미지 리스트 업데이트
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories(
      (prev) =>
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

  const handleRegionChange = (region) => {
    setRegion(region);
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

    // undefined 값 필터링
    const validCategoryIds = selectedCategories.filter(
      (categoryId) => categoryId !== undefined
    );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", content);
    formData.append("price", isFree ? "무료 나눔" : price);
    formData.append("city", region.city);
    formData.append("gu", region.gu);
    formData.append("dong", region.dong);

    formData.append("status", status);

    // 유효한 카테고리만 추가
    validCategoryIds.forEach((categoryId) =>
      formData.append("categoryIds[]", categoryId)
    );

    // 거래 방법 추가
    Object.keys(transactionMethods)
      .filter((method) => transactionMethods[method])
      .forEach((method) => formData.append("transactionMethods[]", method));

    // 이미지 추가
    uploadedImages.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.put(
        `/sellpost/update/${sellPostId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("수정된 게시물:", response.data);
      alert("게시물이 성공적으로 수정되었습니다!");
      navigate(`/sellpost/read/${sellPostId}`);
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
        {/* 이미지 업로드 */}
        <HorizontalField>
          <Label>
            <p>상품 이미지</p>
            <p>({uploadedImages.length}/12)</p>
          </Label>
          <ImageUpload
            onImageChange={handleImageUpload}
            uploadedImages={uploadedImages}
          />
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
          <RegionSelect
            onRegionChange={handleRegionChange}
            selectedRegion={region}
          />
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

        <HorizontalField>
          <Label htmlFor="content">거래 상태</Label>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              checked={status === 1}
              onChange={() => {
                const newStatus = status === 1 ? 0 : 1; // 상태 토글
                setStatus(newStatus); // 상태 업데이트
                console.log("현재 status 값:", newStatus); // 상태 값 확인
              }}
            />
            거래 완료
          </CheckboxLabel>
        </HorizontalField>

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
          <Button
            onClick={() => {
              console.log("전송 전 status 값:", status);
            }}
          >
            수정 완료
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
