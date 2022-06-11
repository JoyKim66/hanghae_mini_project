import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';


import {useHistory} from "react-router-dom";


import styled from 'styled-components';
import writebtn from "./writebtn.png"



function Main() {
    const history = useHistory();
  return (
    <WholeContainer>
        <Category>카테고리
            <ul>
                <li>에티오피아</li>
                <li>킬리만자로</li>
                <li>과테말라</li>
                <li>케냐</li>
                <li>하와이 코나</li>
                <li>브라질 산토스</li>
                <li>블루마운틴</li>
                <li>모카</li>
                <li>디카페인</li>
            </ul>
        </Category>

        <Container sx={{ width: 1000, }}>
        <ImageListItem key="Subheader" cols={2}>
            
        </ImageListItem>
        {itemData.map((item) => (
            <ImageListItem key={item.img}>
            <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
            />
            <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                >
                    
                </IconButton>
                }
            />
            </ImageListItem>
        ))}
        <AddButton>
            <Img src={writebtn} onClick={()=>{
                  history.push("/write")
            }}/>
        </AddButton>
            
        </Container>
    </WholeContainer>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];

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
const ImageBox = styled(ImageListItem)`
    margin: 0; !important;  
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

