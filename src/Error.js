import * as React from 'react';

import styled from "styled-components";

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Error = () => {
    // const history = useHistory();
    return (
        <Container>
            <TextBox>
                로그인 하시면 커피바라의 게시글을 보실수 있어요!
                <Stack direction="row" spacing={1}>
                    <Chip
                        label="지금 바로 로그인하러가기"
                        component="a"
                        href="/login"
                        variant="outlined"
                        clickable
                    />
                </Stack>
            </TextBox>
            
        </Container>
    )
}

export default Error;

const Container = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 80px 0;
    border: 1px solid #eee;
    border-radius: 20px;
`;
const loginBox = styled.div`
    
`;

