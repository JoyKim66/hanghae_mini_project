import * as React from 'react';
import styled from "styled-components";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import {useHistory,useParams} from "react-router-dom";

import { postAdd, postPostList, updatePostList } from './redux/modules/post';


const Input = styled('input')({
    display: 'none',
  });

const Write = () => {
    //state관리
    const [coffeebeanname, setCoffeebeanName] = React.useState('');
    const [cafename, setCafename] = React.useState(null);
    const [cafereview, setCafeReview] = React.useState(null);
    const [img, setImg] = React.useState(null);
    const write_data = useSelector((state)=>state.post.list);
    console.log('write_data',write_data);

    const history = useHistory();

    const id = useParams().id;
    // console.log(id);

    //redux 
    const dispatch = useDispatch();
    const edit_idx = write_data.findIndex((w)=>{
        return w.id === parseInt(id)
    })
    console.log(edit_idx);
    console.log(write_data[edit_idx]);

    
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
        // console.log(e.target.value);
      setCoffeebeanName(e.target.value);
    };

    const handleReviweChange = (e) => {
        // console.log(e.target.value);
        setCafeReview(e.target.value);
    };
    const handleNameChange = (e) => {
        // console.log(e.target.value);
        setCafename(e.target.value);
        
    }
    const uploadImage = (e) => {
        // console.log(e.target.files[0]);
        setImg(e.target.files[0]);
    }

    const addPost = (e) => {
        e.preventDefault();

        const data = {
            post_data: {cafename,cafereview,coffeebeanname},img
        }
        dispatch(postPostList(data));
        
    
    }
    const editPost = (e) => {
        e.preventDefault();
        if (!(coffeebeanname&&cafename&&cafereview&&img)) {
            return alert("게시글 작성내용을 채워주세요");
        }else{
        const edited_data = {
            post_data: {cafename,cafereview,coffeebeanname},img
        }
        dispatch(updatePostList(edited_data,id)); 
    }
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
            defaultValue={id? write_data[edit_idx]?.cafename :null}
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
          defaultValue={id? write_data[edit_idx]?.cafereview :null}
          multiline
          onChange={handleReviweChange}
          rows={4}
            />
        </Box>
        <ButtonWrap>
            <Button2 onClick={()=>{
                history.goBack();
            }}>뒤로가기</Button2>
            {id?( 
            <Button2 onClick={editPost}>수정하기</Button2>
            ): (<Button2 onClick={addPost}>작성하기</Button2>
            )}
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
