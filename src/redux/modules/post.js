import axios from 'axios';


const ADD = "post/ADD";
const LOAD = "post/LOAD";

const initialState = {list:[]};

//액션
export const postAdd = (post_data) => {
    return {type: ADD, post_data}
}
export const postLoad = (post_data) => {
    return {type: LOAD, post_data}
}



//미들웨어
export const getPostList =() => {
    return async function(dispatch){
        axios.get("http://localhost:5001/cafe_list")
        .then(response => {
            console.log('respose: ',response.data);
            dispatch(postLoad(response.data))})}
    }
export const postPostList = (data) => {
    return async function(dispatch){
        console.log("data",data);
        const formData = new FormData();
        formData.append("img",data.img);
        formData.append(
            "post_data",
            new Blob([JSON.stringify(data.post_data)], {
                type:"application/json"
            })
        );
        await axios({
        method: "post",
        url: "http://localhost:5001/cafe_list",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        }).then((response)=> {
            console.log('post_response: ',response.data);
            dispatch(postAdd(response.data));
        })
    }
}


export default function reducer(state=initialState,action={}){
    switch(action.type) {
        case "post/ADD" : {
            // console.log(state,action);
            const new_post_obj = [{
                img: action.post_data.img,
                cafename: action.post_data.cafename,
                review: action.post_data.review,
                coffeebeanname: action.post_data.coffeebeanname,
            }]
            console.log({list:new_post_obj});
            return {list:new_post_obj};
        }
        case "post/LOAD" : {
            // console.log(action);
            return {list: action.post_data};
        } 
        default:
        return state;
    }
}
    