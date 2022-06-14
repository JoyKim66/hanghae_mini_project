import React, { useRef, useState } from "react";
import axios from 'axios';

import styled from "styled-components";


const Comment = () => {

    const comment_ref = useRef();
    const [commentList,setCommentList] = useState([]);

    const addComment = () => {
        // console.log(comment_ref.current.value);
             axios({
                method: "post",
                url: "http://localhost:5001/reply",
                data: {
                    "reply": comment_ref.current.value
                }
                }).then((response)=> {
                    console.log('comment_response ',response.data);
                })
            }
    React.useEffect(()=>{
        axios.get("http://localhost:5001/reply").then(response => {
        console.log(response.data);
        setCommentList(response.data)
        console.log('commentList:',commentList);
        });
    },[])

    return (
        <CommentBox>
            <InputBox>
                댓글작성: 
                <Input type="text" ref={comment_ref}/>
                <Button onClick={addComment}>등록</Button>
            </InputBox>
            {commentList.map((comment,idx) => (
            <>
                <CommentView>
                <div>{comment.nickname}</div>
                <CommentContent>{comment.reply}</CommentContent>
                </CommentView>
                <ButtonBox>
                <Button>수정</Button>
                <Button>삭제</Button>
                </ButtonBox>
            </>
             ))} 
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