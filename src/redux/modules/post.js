import axios from 'axios';
import { localStorageGet } from '../../shared/localStorage';


const BASE_URL = "http://3.38.107.48"

const ADD = "post/ADD";
const LOAD = "post/LOAD";
const CATEGORY_LOAD = "post/CATEGORY_LOAD"

const initialState = {
    is_token: false,
    list:[]
};


//액션
export const postAdd = (post_data) => {
    return {type: ADD, post_data}
}
export const postLoad = (post_data) => {
    return {type: LOAD, post_data}
}
export const categoryLoad = (catagory_data) => {
    return {type: CATEGORY_LOAD, catagory_data }
}



//미들웨어
export const getPostList =() => {
    return async function(dispatch){
        axios.get(`${BASE_URL}/cafereview/list`)
        .then(response => {
            // console.log('respose: ',response.data);
            dispatch(postLoad(response.data))})}
    }

export const getCategoryList = (e) => {
    return async function(dispatch){
        // console.log("ddd");
        axios({
            method: "get",
            url: `http://3.38.107.48/cafereview/list/${e.target.innerText}`,
            
            }).then((response)=> {
                // console.log('category_response ',response.data);
                dispatch(categoryLoad(response.data));
            })
    }
}


export const postPostList = (data) => {
    return async function(dispatch, getState, { history }){
        // console.log(localStorageGet("jwtToken"));
        // console.log("data",data.post_data);
        const formData = new FormData();
        formData.append("img",data.img);
        formData.append(
            "post-data",
            new Blob([JSON.stringify(data.post_data)], {
                type:"application/json"
            })
        );
        for (let [key, value] of formData.entries()) {
            // console.log(key, value);
          }
        await axios({
        method: "post",
        url: `${BASE_URL}/cafereview`,
        data: formData,
        headers: {     
            "Content-Type": "multipart/form-data",
            'Authorization': "Bearer " + localStorageGet("jwtToken") ,
        },
        }).then((response)=> {
            // console.log('post_response: ',response.data);
            history.replace("/")
        })
    }
}

export const updatePostList = (data,id) => {
    return async function(dispatch, getState, { history }){
        // console.log("edit_data: ",data,id);
        const formData = new FormData();
        formData.append("img",data.img);
        formData.append(
            "post-data",
            new Blob([JSON.stringify(data.post_data)], {
                type:"application/json"
            })
        );
        
        await axios({
        method: "patch",
        url: `${BASE_URL}/cafereview/${id}`,
        data: formData,
        headers: {     
            "Content-Type": "multipart/form-data",
            'Authorization': "Bearer " + localStorageGet("jwtToken") ,
        },
        }).then((response)=> {
            // console.log('update_response: ',response.data);
            history.replace("/");
            alert("게시글이 수정되었습니다")
        })


    }
}
export const deletePostList = (id) => {
    return async function(dispatch, getState, { history }){
        // console.log('id:', id);
        await axios({
            method: "delete",
            url: `${BASE_URL}/cafereview/${id}`,
            headers: {     
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorageGet("jwtToken") ,
            },
            }).then((response)=> {
                // console.log('delete_response: ',response.data);
                history.replace("/");
                alert("게시글이 삭제되었습니다")
            })
    }
} 



//리듀서
export default function reducer(state=initialState,action={}){
    switch(action.type) {
        // case "post/ADD" : {
        //     // console.log(state,action);
        //     const new_post_obj = [{
        //         img: action.post_data.img,
        //         cafename: action.post_data.cafename,
        //         review: action.post_data.review,
        //         coffeebeanname: action.post_data.coffeebeanname,
        //     }]
        //     console.log({list:new_post_obj});
        //     return {list:new_post_obj};
        // }
        
        case "post/LOAD": {
            if (localStorageGet("jwtToken")) {
              // 1. 로그인해서 들어와서 로드할 때
              return {...state, list: action.post_data, is_token: true };
            } else if (action.post_data) {
              // 2. 처음 메인 페이지 들어와서 로드할 때
              return {...state, list: action.post_data, is_token: false };
            } else {
              // 3. 로그아웃해서 LOAD 액션할 때
              return {...state, is_token: false };
            }
          }
        
        default:
        return state;
    }
}
    