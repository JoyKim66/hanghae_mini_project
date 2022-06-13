import * as React from 'react';
import styled from "styled-components";

import Comment from './Comment';

import { useSelector } from "react-redux";
import { useParams,useHistory } from 'react-router-dom';




const Detail = () => {
    const post_list = useSelector((state) => state.post.list);
    const post_idx = useParams().idx;
    const post_data = post_list[post_idx];
    const history = useHistory();
    return (
        <div>
        <Container>
            <ImageBox>이미지부분{post_data.img}</ImageBox>
            <TextBox>
                <NameBox>{post_data.cafename}
                <div><hr style={{width:"100%"}}/></div>
                </NameBox>
                <CategoryBox>원두이름:{post_data.coffeebeanname}</CategoryBox>
                <ReviewBox>
                    <div>
                        <Review>
                            {post_data.review}
                        </Review>
                        <ButtonBox>
                            <Button onClick={()=> {
                                history.push("/write/"+post_idx)
                            }}>수정</Button>
                            <Button>삭제</Button>
                        </ButtonBox>
                        
                    </div>
                </ReviewBox>
            </TextBox>
        </Container>
        <Comment/>
    </div>
    )
}

export default Detail;

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const ImageBox = styled.div`
    width: 50%;
    height: 500px;
    border: 1px solid #d3d3d3;  
    margin: 20px;  
`;  
const TextBox = styled.div`
    width: 50%;
    height: 500px;
    border: 1px solid #d3d3d3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 10px;
    margin: 20px;
    `;
const NameBox = styled.div`
    width: 100%;
    height: 100px;
    font-size: large;
    padding: 20px 0;
    font-weight: 700;
`;
const CategoryBox = styled.div`
    width: 100%;
    height: 100px;`;

const ReviewBox = styled.div`
    display: flex;
    flex-direction: column;    
`;
const Review = styled.div`
    width: 100%;
    height: 200px;
    border: 1px solid #d3d3d3;
`;
const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
`;
const Button = styled.button`
    width: 100px;
    height: 30px;
    background: #848484;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
`;
