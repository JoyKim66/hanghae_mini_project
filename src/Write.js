import * as React from 'react';
import styled from "styled-components";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";

import { postAdd } from './redux/modules/post';




const Input = styled('input')({
    display: 'none',
  });

const Write = () => {
    //state관리
    const [coffeebeanname, setCoffeebeanName] = React.useState('');
    const [cafename, setCafename] = React.useState(null);
    const [review, setReview] = React.useState(null);
    const [img, setImg] = React.useState(null);

    //redux 
    const dispatch = useDispatch();

    const history = useHistory();

    
    //원두배열 (store에 저장하기)
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

    //input값 change관리
    const handleSelectChange = (e) => {
        console.log(e.target.value);
      setCoffeebeanName(e.target.value);
    };

    const handleReviweChange = (e) => {
        // console.log(e.target.value);
        setReview(e.target.value);
    };
    const handleNameChange = (e) => {
        // console.log(e.target.value);
        setCafename(e.target.value);
        
    }
    const uploadImage = (e) => {
        console.log(e.target.files[0].name);
        setImg(e.target.files[0].name);
    }

    const addPost = (e) => {
        //리덕스에 저장하기
        console.log(cafename);
        console.log(review);
        console.log(coffeebeanname);
        console.log(img);
        
        
        dispatch(postAdd({img,cafename,review,coffeebeanname}));
        history.push("/");
        
    }

    return (

    <Container>
    <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">coffeebeanname</InputLabel>
            <SelectBox
                labelId="demo-simple-select-label"
                id="coffeebeanname"
                value={coffeebeanname}   
                label="coffeebeanname"
                onChange={handleSelectChange}
            >
                {coffeebean_list.map((coffeebean,idx) => (
                    <MenuItem key={idx} value={coffeebean}>{coffeebean}</MenuItem>
                ))}
                
            </SelectBox>
        </FormControl>
        <FormBox
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off">
            <TextBox>
                <TextField
            required
            id="outlined-required"
            label="카페이름"
            onChange={handleNameChange}
                />
            </TextBox>   
            <ImageBox>이미지를 선택해주세요
            <label htmlFor="contained-button-file">
                <Input accept="image/*" 
                id="contained-button-file" 
                multiple type="file"
                onChange={uploadImage}
                />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            </ImageBox>
                
            </FormBox>
        
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
        
        >
        <TextField
          id="outlined-multiline-static"
          label="카페 후기 상세내용"
          multiline
          onChange={handleReviweChange}
          rows={4}
            />
        </Box>
        <ButtonWrap>
            <Button2>뒤로가기</Button2>
            <Button2 onClick={addPost}>등록하기</Button2>
        </ButtonWrap>
    </div>   
    </Container>
    
    )
}

export default Write;

const Container = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid #eee;
    padding:10% 0 10% 0;
    margin: 20px auto;
    width: 100%;
    height: 80vh;
`;

const SelectBox = styled(Select)`
    width:20ch;
    margin:10px;
`;
const FormBox = styled(Box)`
    display: flex;
    flex-direction: column;
`;
const TextBox = styled.div`
    margin: 0 0 10px 0;
`;
const ImageBox = styled.div`
    border: 1px solid #acabab;
    width: 35ch;
    height: 8ch;
    margin: auto;
    display: flex;
    align-content: flex-end;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 0 10px;
`
const ButtonWrap = styled.div`
    display: flex;
    justify-content: center;
`;

const Button2 = styled.button`
    margin: 0 10px;
    width: 100px;
    height: 30px;
    background: #878787;
    border: 1px solid #a6a6a6;
    color: white;
    border-radius: 5px;
`;
