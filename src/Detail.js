import * as React from 'react';
import axios from 'axios';
import styled from "styled-components";

import Comment from './Comment';

import { useSelector } from "react-redux";
import { useParams,useHistory } from 'react-router-dom';



const Detail = () => {
    const post_list = useSelector((state) => state.post.list);
    const post_id = useParams().id;
    const history = useHistory();
    const [getData,setGetData] = React.useState(null);
    console.log("post_id: ",post_id);

    React.useEffect(()=>{
        axios.get(`http://localhost:5001/cafe_list/${post_id}`)
        .then(response=> {
            console.log('respose: ',response.data);
            setGetData(response.data);
        })},[])
    return (
        <div>
        <Container>
            <ImageBox>이미지부분{getData?.data.imgUrl}</ImageBox>
            <TextBox>
                <NameBox>{getData?.data.post_data.cafename}
                <div><hr style={{width:"100%"}}/></div>
                </NameBox>
                <CategoryBox>원두이름:{getData?.data.post_data.coffeebeanname}</CategoryBox>
                <ReviewBox>
                    <div>
                        <Review>
                            {getData?.data.post_data.cafereview}
                        </Review>
                        <ButtonBox>
                            <Button onClick={()=> {
                                history.push("/write/"+post_id)
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
