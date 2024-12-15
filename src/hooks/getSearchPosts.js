import axios from "axios";

const getSearchPosts = async ({keyword,pageParam}) => {
    console.log(`pageParam: ${pageParam}`);
    console.log(`keyword: ${keyword}`);
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser); // JSON 문자열을 객체로 변환
    const memberId = parsedUser?.memberId || -1;
    const { data } = await axios.get(
      `sellpost/search?keyword=${keyword}&page=${pageParam}&memeberId=${memberId}`
    );
    console.log("Posts data searched");
    return data;
};

export default getSearchPosts;
