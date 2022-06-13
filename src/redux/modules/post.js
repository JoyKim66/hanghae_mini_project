const ADD = "post/ADD";


const initialState = {list:[]};


export const postAdd = (post_data) => {
    return {type: ADD, post_data}
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
            // console.log({list:new_post_obj});
            return {list:new_post_obj};
        }
        default:
        return state;
    }
    
}
    