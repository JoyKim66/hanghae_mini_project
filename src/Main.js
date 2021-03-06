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

import styled,{keyframes} from 'styled-components';

import writebtn from "./writebtn.png"
import { getPostList,getCategoryList } from './redux/modules/post';
import { postListGet } from './shared/common';
const SIZE = 5; //고정 값


function Main() {
    const history = useHistory();
    const dispatch = useDispatch();
    const is_login = useSelector((state)=>state.post.is_token)
    const [sortBy, setOrder] = React.useState('id');
    const [page, setOffset] = React.useState(1);
    const [hasNext, setHasNext] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const post_list = useSelector((state)=>state.post.list)
    // console.log("post_list: ",post_list);
    // console.log('is_login',is_login);
  


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

    const handleLoad = async (options) => {
      const {content, last} = await postListGet(options);
      if (options.page === 1) {
        setItems(content);
      } else {
        setItems([...items, ...content]);
      }
      setOffset(options.page + 1);
      setHasNext(last);
    };

    const handleLoadMore = async () => {
      await handleLoad({ sortBy, page, size: SIZE });
    };

    React.useEffect(()=>{
      handleLoad({ sortBy, page: 1, size: SIZE })
      dispatch(getPostList());
    },[]);

  return (
    <>
    <WholeContainer>
        <Category>
          <div>Category</div>
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
              {coffeebean_list.map((coffeebean,idx)=> (
                  <ListItem disablePadding key={idx}>
                  <ListItemButton onClick={clickedCategory} 
                  value={coffeebean}>
                    <ListItemText primary={coffeebean}/>
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
                history.push("/detail/"+item.id)
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
        
        </Container>
        
    </WholeContainer>
    <ButtonBox>
          {/* <Btn disabled={hasNext} onClick={handleLoadMore}>더보기</Btn> */}
          {is_login&&
            <AddButton>
                <Img src={writebtn} onClick={()=>{
                      history.push("/write")
                }}/>
            </AddButton>
          }
    </ButtonBox>
    </>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;
const Container = styled(ImageList)`
  width: 85% !important;
  height: auto;
  margin: 0 15% 0 0;
  overflow-y: visible !important;
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
  transition: transform 0.2s;
  &:hover {
    transform: rotate(30deg);
  }
`;
const List = styled.ul`
  cursor: url(myBall.cur),auto;
`;
const ButtonBox = styled.div`
  display: flex;
    flex-direction: column;
`;
const Btn = styled.button`
    height: 50px;
    border: 1px solid #333;
    border-radius: 0.4em;
    margin-top: 10px;
    display: block;
    &:disabled{
        display: none;
    }
    width: 75%;
    margin: 0 auto;
`

