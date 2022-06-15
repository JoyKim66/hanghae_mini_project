import * as React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import {useHistory} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { localStorageGet } from './shared/localStorage';

import styled from 'styled-components';
import writebtn from "./writebtn.png"
import { getPostList,getCategoryList } from './redux/modules/post';



function Main() {
    const history = useHistory();
    const dispatch = useDispatch();
    const post_list = useSelector((state)=>state.post.list)
    console.log("post_list: ",post_list);
    const is_token = localStorageGet("jwtToken");

    const coffeebean_list = [
      "에티오피아", 
      "킬리만자로", 
      "과테말라", 
      "케냐", 
      "콜롬비아", 
      "하와이 코나", 
      "브라질 산토스", 
      "블루마운틴", 
      "모카", 
      "디카페인"]

    const clickedCategory = (e) => {
      dispatch(getCategoryList(e));
    }


    React.useEffect(()=>{
      dispatch(getPostList());
    },[]);


  return (
    <WholeContainer>
      
        <Category>원두 카테고리
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
              {coffeebean_list.map((coffeebean,idx)=> (
                  <ListItem disablePadding key={idx}>
                  <ListItemButton onClick={clickedCategory} 
                  value={coffeebean}>
                    <ListItemText primary={coffeebean}   />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Category>

        <Container sx={{ width: 1000, }}>
        <ImageListItem key="Subheader" cols={2}>
        </ImageListItem>
        {post_list.map((item,idx) => (
            <ImageListItem key={item.id}
            onClick={()=>{
              is_token?( 
              history.push("/detail/"+item.id)
              ) : (
              history.push("/error")
              )
            }}> 
            <img
                src={`${item.imgUrl}?w=248&fit=crop&auto=format`}
                srcSet={`${item.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.cafename}
                loading="lazy"
            />
            <ImageListItemBar
                title={item.cafename}
                subtitle={item.nickname}
                actionIcon={
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.cafename}`}
                >                   
                </IconButton>
                }
            />
            </ImageListItem>
        ))}
        {is_token?(
        <AddButton>
            <Img src={writebtn} onClick={()=>{
                  history.push("/write")
            }}/>
        </AddButton>
            ) : null}
        </Container>
    </WholeContainer>
  );
}

export default Main;

const WholeContainer = styled.div`
    display: flex;
`;

const Category = styled.div`
    width: 15%;
    border: 1px solid #eee;
    height: 50vh;
    
`;

const Container = styled(ImageList)`
  width: 80%;
  height: auto;
  margin: 0;
  overflow-y: visible !important;
  }
`;

const AddButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const Img = styled.img`
  max-width: 60px;
  min-height: 60px;
  position: fixed;
  top: 85%;
  left: 90%;
`;
const List = styled.li`
  border: 1px solid;
  cursor: url(myBall.cur),auto;

`;


