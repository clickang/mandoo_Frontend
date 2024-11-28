import React, { useState, useEffect } from "react";
import {
  UploadContainer,
  UploadBox,
  UploadText,
  PreviewContainer,
  PreviewList,
  PreviewItem,
} from "./ImageUploadStyles";

const ImageUpload = ({ onImageChange }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...images, ...files].slice(0, 12); // 최대 12개 제한
    setImages(updatedImages);
  };

  // 부모 컴포넌트로 이미지 리스트 전달
  useEffect(() => {
    if (onImageChange) {
      onImageChange(images);
    }
  }, [images, onImageChange]);

  return (
    <UploadContainer>
      {/* 업로드 영역 */}
      <UploadBox htmlFor="image-upload">
        <UploadText>
          <p>이미지 등록</p>
          <p>최대 12개</p>
        </UploadText>
      </UploadBox>

      {/* 파일 입력 필드 (숨김 처리) */}
      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      {/* 업로드된 이미지 미리보기 */}
      <PreviewContainer>
        {images.length > 0 && (
          <>
            <h3>업로드된 이미지</h3>
            <PreviewList>
              {images.map((img, idx) => (
                <PreviewItem key={idx}>
                  <img src={URL.createObjectURL(img)} alt={img.name} />
                </PreviewItem>
              ))}
            </PreviewList>
          </>
        )}
      </PreviewContainer>
    </UploadContainer>
  );
};

export default ImageUpload;
