import React from "react";

import styled from "styled-components";


const Comment = () => {

    return (
        <CommentBox>
            <InputBox>
                댓글작성: 
                <Input type="text"/>
                <Button>등록</Button>
            </InputBox>
            <CommentView>
                댓글
            </CommentView>
            <ButtonBox>
                <Button>수정</Button>
                <Button>삭제</Button>
            </ButtonBox>
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