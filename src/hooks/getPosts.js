import axios from "axios";

const getPosts = async ({pageParam}) => {
    console.log(`pageParam: ${pageParam}`);
    const { data } = await axios.get(`sellpost/recent?page=${pageParam}`);
    console.log("Posts received");
    return data;
};

export default getPosts;
