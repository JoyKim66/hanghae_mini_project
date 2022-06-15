import React, { useRef, useState } from "react";
import axios from 'axios';
import { localStorageGet } from "./shared/localStorage";
import { useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";



import styled from "styled-components";


const Comment = ({post_id}) => {
    const comment_ref = useRef();
    const edit_ref = useRef();
    const [commentList,setCommentList] = useState([]);
    const [isEdit,setIsEdit] = useState(null);
    const dispatch = useDispatch();
   



    //토큰 받아와서 유저정보 획득하기
    const token = localStorageGet("jwtToken");
    // console.log(token);
    const decoded_token = jwt_decode(token);
    // console.log(decoded_token);

    //userid
    const userId = decoded_token.Userid;
    //nickname
    const nickname = decoded_token.nickname;

    // console.log('post_id: ',post_id);
    const addComment = () => {
        // console.log(comment_ref.current.value);
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
    
    React.useEffect(()=>{
        axios.get(`http://3.38.107.48/reply/list/${post_id}`).then(response => {
        setCommentList(response.data);
        // console.log('commentList',response.data)
        });
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
                commentList.map((comment,idx) => (
                    parseInt(isEdit) === comment.id? 
                    (<InputBox>
                        댓글수정: 
                        <Input type="text" ref={edit_ref} 
                        defaultValue={comment.reply}/>
                        <Button onClick={updateComment}>수정</Button>
                    </InputBox>)
                    : (
                <CommentView>
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
            
        </CommentBox>
    )
}

export default Comment;

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
const ButtonBox = styled.button`
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