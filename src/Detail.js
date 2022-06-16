import * as React from 'react';
import axios from 'axios';
import styled from "styled-components";
import jwt_decode from "jwt-decode";


import Comment from './Comment';

import { useParams,useHistory } from 'react-router-dom';
import { deletePostList } from './redux/modules/post';
import { useDispatch } from "react-redux";
import like_off from "./assets/images/like_off.svg"
import like_on from "./assets/images/like_on.svg"
import { localStorageGet } from './shared/localStorage';

const Detail = () => {
    const post_id = useParams().id;
    const history = useHistory();
    const [getData,setGetData] = React.useState({});;
    const dispatch = useDispatch();

    //토큰 받아와서 유저정보 획득하기
    const token = localStorageGet("jwtToken");
    const decoded_token = jwt_decode(token);

    //userid
    const userId = decoded_token.Userid;
    const [Like, setLike] = React.useState(false);

    const toggleLike = () => {
        if(Like){ // 이미 좋아요를 눌렀는데 다시 눌렀을 때
            axios.get(`http://3.38.107.48/like/${post_id}`,{
                headers: {'Authorization': "Bearer " + localStorageGet("jwtToken")},
            })
            .then(res => {
                setLike(false);
            })
        } else if(!Like) {  // 아무것도 누르지 않은 상태일 때
            try {
                axios.get(`http://3.38.107.48/unlike/${post_id}`,{
                    headers: {'Authorization': "Bearer " + localStorageGet("jwtToken")},
                })
                .then((res) => {
                    setLike(true);
                });
            }catch(err){
                if(err.response.status === 403){
                    window.alert("로그인한 사용자만 이용할수 있습니다.")
                } 
            }
        }
    };

    const handeLoad = () => {
        axios.get(`http://3.38.107.48/like/check/${post_id}`,{
            headers: {'Authorization': "Bearer " + localStorageGet("jwtToken")},
        })
        .then(res => {
            console.log(res.data)
            setLike(res.data);
        })
    };

    React.useEffect(()=>{
        axios.get(`http://3.38.107.48/cafereview/list/detail/${post_id}`)
        .then(response=> {
            setGetData(response.data);
        });
        handeLoad()
    },[Like])

    const postDelete = () => {
        dispatch(deletePostList(post_id));
    }    
    return (
        <div>
        <Container>
            <ImageBox><Image src={getData?.imgUrl}/></ImageBox>
            <TextBox>
                <div className='inner'>
                    <NameBox>{getData?.cafename}</NameBox>
                    <LikeInner onClick={toggleLike} className={Like ? "is_on" : null}>
                        <span className="like_off"><img src={like_off} alt="좋아요 아이콘"/></span>
                        <span className="like_on"><img src={like_on} alt="좋아요 아이콘"/></span>
                    </LikeInner>
                </div>
                <CategoryBox>원두이름:{getData?.coffeebeanname}</CategoryBox>
                <ReviewBox>
                    <NameBox>
                        <h2>{getData?.cafename}</h2>
                    </NameBox>
                    <div>
                        <Review>
                            {getData?.cafereview}
                        </Review>
                        {getData.userid === userId?(
                        <ButtonBox>
                            <Buttons onClick={()=> {
                                history.push("/write/"+post_id)
                            }}>수정</Buttons>
                            <Buttons onClick={postDelete}>삭제</Buttons>
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
    height: 600px;
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
const LikeInner = styled.div`
    &.is_on .like_off{
        display: block;
    }
    &.is_on .like_on{
        display: none;
    }
    & .like_off{
        display: none;
    }
    & .like_on{
        display: block;
    }
`;
const TextBox = styled.div`
    width: 50%;
    height: 600px;
    border: 1px solid #d3d3d3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 10px;
    margin: 20px;
    & > .inner{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
const NameBox = styled.div`
    width: 100%;
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
const Buttons = styled.button`
    width: 100px;
    height: 30px;
    background: #848484;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
`;
