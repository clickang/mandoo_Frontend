import axios from "axios";

const getPosts = async ({pageParam}) => {
    console.log(`pageParam: ${pageParam}`);
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser); // JSON 문자열을 객체로 변환
    const memberId = parsedUser?.memberId || -1;
    const { data } = await axios.get(
      `sellpost/recent?page=${pageParam}&memberId=${memberId}`
    );
    console.log("Posts received");
    return data;
};

export default getPosts;
