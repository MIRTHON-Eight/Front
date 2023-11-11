import { Container } from '../styles/global';
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import back from '../assets/back.png'
import logo from '../assets/logo_detail.png'
import cart from '../assets/cart.png'

function Bver() {
    return(
        <Container>
            <Header>
                    <img src={back} alt="back" />
                    <Link to={'/'}><img src={logo} alt="Bver" /></Link>
                    <Link to={'/cart'}><img className='cart' src={cart} alt="cart" /></Link>
                </Header>
        </Container>

    )
}

export default Bver;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.5rem;

    img {
        padding-left: 3rem;
        padding-right: 3rem;
    }

    .cart {
        width: 35px;
        height: 35px;
        padding-top: 0.6rem;
    }
`