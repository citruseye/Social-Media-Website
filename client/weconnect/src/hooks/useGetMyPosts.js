import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/postSlice";


const useGetMyPosts = (id) => {
    const dispatch = useDispatch();
    const {refresh} = useSelector(store=>store.post);
    useEffect(()=>{
        const fetchMyPosts = async () => {
            try {
                const res = await axios.get(`${POST_API_END_POINT}/allposts/${id}`,{
                    withCredentials:true
                });
                dispatch(getAllPosts(res.data.posts));
            } catch (error) {
                console.log(error);
            }
     
        }
        fetchMyPosts();
            
    },[refresh]);
};
export default useGetMyPosts;