import * as React from 'react';
import styled from "styled-components";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Write = () => {
    const [coffeebeanname, setcoffeebeanname] = React.useState('');
    const handleChange = (event) => {
      setcoffeebeanname(event.target.value);
    };
    return (

    <Container>
        
    <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">coffeebeanname</InputLabel>
            <SelectBox
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={coffeebeanname}
                label="coffeebeanname"
                onChange={handleChange}
            >
                <MenuItem value={10}>에티오피아</MenuItem>
                <MenuItem value={20}>킬리만자로</MenuItem>
                <MenuItem value={30}>케냐</MenuItem>
                <MenuItem value={30}>콜롬비아</MenuItem>
                <MenuItem value={30}>하와이 코나</MenuItem>
                <MenuItem value={30}>브라질 산토스</MenuItem>
                <MenuItem value={30}>블루마운틴</MenuItem>
                <MenuItem value={30}>모카</MenuItem>
                <MenuItem value={30}>디카페인</MenuItem>
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
                />
            </TextBox>
                
            <ImageBox>이미지를 선택해주세요
                <input type="file"/>
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
          rows={4}
            />
        </Box>
        <ButtonWrap>
            <Button>뒤로가기</Button>
            <Button>등록하기</Button>
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
    width: 50%;
    height: 50vh;
    margin: 20px auto;
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
    width: 34ch;
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

const Button = styled.button`
    margin: 0 10px;
    width: 100px;
    height: 30px;
    background: #878787;
    border: 1px solid #a6a6a6;
    color: white;
    border-radius: 5px;
`;
