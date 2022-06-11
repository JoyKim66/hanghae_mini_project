import React from "react";

import styled from "styled-components";


const Detail = () => {
    return (
        <div>
            콘테이너부분
            <div>이미지부분</div>
            <div>
                텍스트부분
                <div>카페이름</div>
                <div>카테고리</div>
                <div>원두이름</div>
                <div>
                    리뷰내용
                    <input type="text"/>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;