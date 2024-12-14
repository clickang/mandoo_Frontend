import axios from "axios";

const getSearchPosts = async ({keyword,pageParam}) => {
    console.log(`pageParam: ${pageParam}`);
    console.log(`keyword: ${keyword}`);
    const { data } = await axios.get(`sellpost/search?keyword=${keyword}&page=${pageParam}`);
    console.log("Posts data searched");
    return data;
};

export default getSearchPosts;
