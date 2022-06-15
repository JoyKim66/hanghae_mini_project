import * as React from 'react';
import axios from 'axios';
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { localStorageGet } from "./shared/localStorage";


import Comment from './Comment';

import { useParams,useHistory } from 'react-router-dom';
import { deletePostList } from './redux/modules/post';
import { useDispatch } from "react-redux";

const Detail = () => {
    const post_id = useParams().id;
    const history = useHistory();
    const [getData,setGetData] = React.useState({});
    console.log("post_id: ",post_id);
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


    React.useEffect(()=>{
        axios.get(`http://3.38.107.48/cafereview/list/detail/${post_id}`)
        .then(response=> {
            console.log('respose: ',response.data);
            setGetData(response.data);
        })},[])

    const postDelete = () => {
        dispatch(deletePostList(post_id));
    }    
    return (
        <div>
        <Container>
            <ImageBox><Image src={getData?.imgUrl}/></ImageBox>
            <TextBox>
                <NameBox>{getData?.cafename}
                <div><hr style={{width:"100%"}}/></div>
                </NameBox>
                <CategoryBox>원두이름:{getData?.coffeebeanname}</CategoryBox>
                <ReviewBox>
                    <div>
                        <Review>
                            {getData?.cafereview}
                        </Review>
                        {getData.userid === userId?(
                        <ButtonBox>
                            <Button onClick={()=> {
                                history.push("/write/"+post_id)
                            }}>수정</Button>
                            <Button onClick={postDelete}>삭제</Button>
                        </ButtonBox>
                        ) : null
                            }
                    </div>
                </ReviewBox>
            </TextBox>
        </Container>
        <Comment post_id={post_id}/>
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
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;  
const Image = styled.img`
    max-width: 100%;
    height: auto;
    display: block; 
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
