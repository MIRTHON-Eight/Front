import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import lineseed from '../font/LINESeedKR-Rg.ttf'

export const Container = styled.div`
    @font-face {
        font-family: 'lineseed';
        src: local('lineseed'), local('lineseed');
        font-style: normal;
        src: url(${lineseed}) format('truetype');
    }

    font-family: lineseed;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    text-align: center;
    background: linear-gradient(to bottom, #fff4ed, #ffddbc);
    background-size: cover;
    -ms-overflow-style: none;
    scrollbar-width: none;
    align-items: center;
    //justify-content: center;
    overflow-x: hidden;
    padding-bottom: 60px;


    @media (hover: hover) {
        width: 390px;
        margin: 0 auto;
    }

    &::-webkit-scrollbar {
        display: none;
    }
    
    .body {
        //min-height: calc(100vh - 145px);
        cursor: none;
        .scrollbox {
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }
        }
    }

    
`;
