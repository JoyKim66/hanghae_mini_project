import React, { useRef, useState } from "react";
import axios from 'axios';
import { useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
import { getComment } from "./shared/common";
import { localStorageGet } from "./shared/localStorage";
const SIZE = 4; //고정 값

const Comment = ({post_id}) => {
    const comment_ref = useRef();
    const edit_ref = useRef();
    const dispatch = useDispatch();
   
    //토큰 받아와서 유저정보 획득하기
    const token = localStorageGet("jwtToken");
    const decoded_token = jwt_decode(token);

    //userid
    const userId = decoded_token.Userid;
    const [isEdit, setIsEdit] = useState(null);
    const [sortBy, setOrder] = useState('id');
    const [page, setOffset] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [items, setItems] = useState([]);

    const addComment = () => {
        if (!comment_ref.current.value) {
            alert("댓글을 작성해주세요")
        return null;}
        dispatch(postCommentList());
    }
    const postCommentList = () => {
        return async function(dispatch, getState, { history }){
            axios({
                method: "post",
                url: `http://3.38.107.48/reply/${post_id}`,
                data: {
                    "reply": comment_ref.current.value, 
                },
                headers: {     
                    'Authorization': "Bearer " + localStorageGet("jwtToken") ,
                },
                }).then((response)=> {
                })
            window.location.replace("/detail/"+post_id)
        }
    }
    const clickedUpdateComment = (e) => {
        setIsEdit(e.target.value); 
    }

    const updateComment = () => {
        if (!edit_ref.current.value) {
            alert("댓글을 작성해주세요")
        return null;}
        axios({
            method: "patch",
            url: `http://3.38.107.48/reply/${post_id}/${isEdit}`,
            data: {
                "reply": edit_ref.current.value, 
            },
            headers: {     
                'Authorization': "Bearer " + localStorageGet("jwtToken") ,
            },
            }).then((response)=> {
                // console.log('update_comment_response ',response.data);
            })
            window.location.replace("/detail/"+post_id)
    }
    const deleteComment = (e) => {
        // console.log(e.target.value);
        axios({
            method: "delete",
            url: `http://3.38.107.48/reply/${post_id}/${e.target.value}`,
            headers: {     
                'Authorization': "Bearer " + localStorageGet("jwtToken") ,
            },
            }).then((response)=> {
                // console.log('delete_comment_response ',response.data);
            })
            window.location.replace("/detail/"+post_id)
    }


    const handleLoad = async (options) => {
        const {content, last} = await getComment(options);
        if (options.page === 1) {
          setItems(content);
        } else {
          setItems([...items, ...content]);
        }
        setOffset(options.page + 1);
        setHasNext(last);
    };
    
    const handleLoadMore = async () => {
        await handleLoad({ sortBy, page, post_id, size: SIZE });
    };

    React.useEffect(()=>{
        handleLoad({ sortBy, page: 1, post_id, size: SIZE })
    },[])

    return (
            <CommentBox>
                 {isEdit? null
                :(
            <InputBox>
                댓글작성: 
                <Input type="text" ref={comment_ref}/>
                <Button onClick={addComment}>등록</Button>
                
            </InputBox>
                )}
           
            { 
                items.map((comment,idx) => (
                    parseInt(isEdit) === comment.id? 
                    (<InputBox>
                        댓글수정: 
                        <Input type="text" ref={edit_ref} 
                        defaultValue={comment.reply}/>
                        <Button onClick={updateComment}>수정</Button>
                    </InputBox>)
                    : (
                <CommentView key={idx}>
                    <div>{comment.nickname}</div>
                    <CommentContent>{comment.reply}</CommentContent>
                   {comment.userid === userId? (
                    <ButtonBox>
                        <Button value={comment.id} onClick={clickedUpdateComment}>수정</Button>
                        <Button value ={comment.id} onClick={deleteComment}>삭제</Button>
                    </ButtonBox>  )
                    :null}
                </CommentView> 
                    )
             ))
            }
             <Btn disabled={hasNext} onClick={handleLoadMore}>더보기</Btn>
            
        </CommentBox>
    )
}

export default Comment;

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 60px;
`;

const CommentView = styled.div`
    width: 80%;
    border: 1px solid #d3d3d3;  
    height: 10vh;
    display: flex;
    margin: 5px 0;

`;
const CommentContent = styled.div`
    margin: 0 5px;
    width: 100%;
    word-break: break-all;

`;
const InputBox = styled.div`
    display: flex;
    width: 80%;
`;
const Input = styled.input`
    border: 1px solid #d3d3d3;  
    border-radius: 5px;
    width: 100%;
`;
const ButtonBox = styled.div`
    display: flex;
    width: 80%;
    justify-content: flex-end;
`;
const Button = styled.button`
    width: 100px;
    height: 30px;
    background: #848484;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
`;
const Btn = styled.button`
    width: 100px;
    height: 30px;
    border: 1px solid #333;
    border-radius: 0.4em;
    margin-top: 10px;
    &:disabled{
        display: none;
    }
`