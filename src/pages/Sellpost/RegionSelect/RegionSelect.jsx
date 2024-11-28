import React, { useState } from "react";
import {
  RegionContainer,
  RegionColumn,
  RegionItem,
} from "./RegionSelectStyles";

const regions = {
    서울: {
      강남구: ["압구정동", "청담동", "삼성동", "논현동"],
      강북구: ["미아동", "번동", "수유동"],
      서초구: ["반포동", "서초동", "잠원동"],
      종로구: ["삼청동", "평창동", "혜화동"],
    },
    경기: {
      수원시: ["권선구", "영통구", "장안구", "팔달구"],
      성남시: ["분당구", "수정구", "중원구"],
      고양시: ["일산동구", "일산서구", "덕양구"],
      용인시: ["수지구", "기흥구", "처인구"],
    },
    인천: {
      남동구: ["구월동", "간석동", "논현동"],
      부평구: ["부개동", "삼산동", "십정동"],
      계양구: ["계산동", "작전동", "효성동"],
      중구: ["신포동", "연안동", "운서동"],
    },
    부산: {
      해운대구: ["우동", "중동", "송정동"],
      수영구: ["광안동", "남천동", "민락동"],
      동래구: ["명륜동", "온천동", "사직동"],
      중구: ["보수동", "광복동", "남포동"],
    },
    대구: {
      중구: ["동인동", "삼덕동", "대봉동"],
      수성구: ["범어동", "만촌동", "중동"],
      동구: ["신암동", "방촌동", "효목동"],
      달서구: ["상인동", "월성동", "용산동"],
    },
    광주: {
      동구: ["학동", "지산동", "산수동"],
      서구: ["치평동", "풍암동", "금호동"],
      남구: ["주월동", "봉선동", "진월동"],
      북구: ["운암동", "문흥동", "중흥동"],
    },
    대전: {
      동구: ["대동", "자양동", "가양동"],
      중구: ["은행동", "대흥동", "유천동"],
      서구: ["둔산동", "관저동", "월평동"],
      유성구: ["봉명동", "전민동", "궁동"],
    },
    울산: {
      중구: ["성남동", "태화동", "학성동"],
      남구: ["삼산동", "달동", "신정동"],
      동구: ["화정동", "전하동", "남목동"],
      북구: ["연암동", "양정동", "효문동"],
    },
    강원: {
      춘천시: ["효자동", "퇴계동", "소양동"],
      강릉시: ["교동", "옥천동", "포남동"],
      원주시: ["단계동", "무실동", "혁신도시"],
      동해시: ["천곡동", "발한동", "묵호동"],
    },
    충남: {
      천안시: ["동남구", "서북구"],
      공주시: ["신관동", "중동", "유구읍"],
      보령시: ["대천동", "죽정동", "웅천읍"],
      서산시: ["동문동", "성연면", "음암면"],
    },
    충북: {
      청주시: ["상당구", "흥덕구", "서원구", "청원구"],
      충주시: ["교현동", "연수동", "목행동"],
      제천시: ["청전동", "장락동", "의림동"],
      음성군: ["금왕읍", "맹동면", "대소면"],
    },
    전남: {
      목포시: ["상동", "하당동", "옥암동"],
      여수시: ["학동", "문수동", "돌산읍"],
      순천시: ["조례동", "왕지동", "연향동"],
      광양시: ["중동", "광양읍", "골약동"],
    },
    전북: {
      전주시: ["완산구", "덕진구"],
      군산시: ["수송동", "나운동", "미룡동"],
      익산시: ["영등동", "부송동", "모현동"],
      정읍시: ["상동", "수성동", "신태인읍"],
    },
    경남: {
      창원시: ["마산합포구", "마산회원구", "진해구"],
      진주시: ["충무공동", "평거동", "상평동"],
      김해시: ["삼계동", "장유동", "내외동"],
      거제시: ["옥포동", "고현동", "아주동"],
    },
    경북: {
      포항시: ["북구", "남구"],
      경주시: ["동천동", "황성동", "용강동"],
      안동시: ["옥동", "평화동", "송하동"],
      구미시: ["인동동", "공단동", "상모동"],
    },
    제주: {
      제주시: ["이도동", "삼도동", "노형동"],
      서귀포시: ["중문동", "강정동", "대정읍"],
    },
  };
  
  const RegionSelect = ({ onRegionChange }) => {
    const [selectedCity, setSelectedCity] = useState("서울");
    const [selectedDistrict, setSelectedDistrict] = useState("강남구");
    const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  
    const handleCityClick = (city) => {
      setSelectedCity(city);
      setSelectedDistrict("");
      setSelectedNeighborhood("");
      onRegionChange({ city, district: "", neighborhood: "" });
    };
  
    const handleDistrictClick = (district) => {
      setSelectedDistrict(district);
      setSelectedNeighborhood("");
      onRegionChange({ city: selectedCity, district, neighborhood: "" });
    };
  
    const handleNeighborhoodClick = (neighborhood) => {
      setSelectedNeighborhood(neighborhood);
      onRegionChange({
        city: selectedCity,
        district: selectedDistrict,
        neighborhood,
      });
    };
  
    return (
      <RegionContainer>
        {/* 시/도 */}
        <RegionColumn>
          {Object.keys(regions).map((city) => (
            <RegionItem
              key={city}
              isSelected={selectedCity === city}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </RegionItem>
          ))}
        </RegionColumn>
  
        {/* 구/군 */}
        <RegionColumn>
          {selectedCity &&
            Object.keys(regions[selectedCity]).map((district) => (
              <RegionItem
                key={district}
                isSelected={selectedDistrict === district}
                onClick={() => handleDistrictClick(district)}
              >
                {district}
              </RegionItem>
            ))}
        </RegionColumn>
  
        {/* 동/리 */}
        <RegionColumn>
          {selectedCity &&
            selectedDistrict &&
            regions[selectedCity][selectedDistrict].map((neighborhood) => (
              <RegionItem
                key={neighborhood}
                isSelected={selectedNeighborhood === neighborhood}
                onClick={() => handleNeighborhoodClick(neighborhood)}
              >
                {neighborhood}
              </RegionItem>
            ))}
        </RegionColumn>
      </RegionContainer>
    );
  };
  
  export default RegionSelect;