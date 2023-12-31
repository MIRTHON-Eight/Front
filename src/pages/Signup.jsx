import axios from 'axios';
import { Container } from '../styles/global';
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from '../assets/logo.png'
import clearlogo from '../assets/clear logo.png'

function Signup() {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showNicknameMessage, setShowNicknameMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 회원가입 정보를 서버로 전송
        axios
            .post('http://13.124.196.200:8081/api/join', {
                nickname: nickname,
                userName: id,
                password: password,
                passwordCheck: repassword,
                phoneNum: phone,
                address: address
            })
            .then((response) => {
                // 회원가입이 성공했을 때의 처리
                navigate('/login');
            })
            .catch((error) => {
                if (error.response) {
                    // 서버가 응답한 상태 코드가 2xx 범위를 벗어난 경우
                    console.error('Server responded with a non-2xx status', error.response.data);
                } else if (error.request) {
                    // 요청은 보냈지만 응답을 받지 못한 경우
                    console.error('No response received from the server', error.request);
                } else {
                    // 요청을 보내기 전에 발생한 오류
                    console.error('Error before sending the request', error.message);
                }
            });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container>
                <Top>
                    <Link to={'/'}><img src={logo} alt="Bver" /></Link>
                    <p>회원가입</p>
                </Top>
                <Input>
                    <p>닉네임</p>
                    <input type="text" value={nickname} placeholder='닉네임을 입력해주세요.' onChange={(e) => setNickname(e.target.value)} />
                    <div>
                        <button onClick={() => setShowNicknameMessage(true)}>중복확인</button>
                        {showNicknameMessage && (
                            <p className='message'>사용 가능한 닉네임입니다.</p>
                        )}
                    </div>
                    <p>아이디</p>
                    <input type="text" value={id} placeholder='아이디를 입력해주세요.' onChange={(e) => setId(e.target.value)}
                        onClick={() => setShowNicknameMessage(false)} />
                    <p>비밀번호</p>
                    <input type="password" value={password} placeholder='비밀번호를 입력해주세요.' onChange={(e) => setPassword(e.target.value)} />
                    <p>비밀번호 확인</p>
                    <input type="password" value={repassword} placeholder='비밀번호를 한 번 더 입력해주세요.' onChange={(e) => setRepassword(e.target.value)} />
                    <p>주소</p>
                    <input type="text" value={address} placeholder='주소를 입력해주세요.' onChange={(e) => setAddress(e.target.value)} />
                    <p>전화번호</p>
                    <input type="number" value={phone} placeholder='전화번호를 입력해주세요.' onChange={(e) => setPhone(e.target.value)} />
                    <button>인증</button>
                </Input>
                <Button onClick={handleSubmit}>회원가입</Button>
            </Container>
        </motion.div>
    );
};
export default Signup;

const Top = styled.form`
    display: flex;
    flex-direction: column;
    margin-right: 5rem;
    margin-top: 3rem;
    margin-left: 0.5rem;
    width: 17.5rem;
    text-align: left;

    img {
        width: 8.8rem;
        height: 4.8rem;
    }

    p {
        margin: 0;
        padding-left: 2rem;
        font-size: 1.5rem;
        font-weight: 650;
    }
`

const Input = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    background-color: #fffaf7;
    width: 17.5rem;
    height: 36rem;
    padding: 1rem 1.5rem;
    border-radius: 1.8rem;
    box-shadow: 0 5px 18px -7px #c9c9c9;
    font-weight: 600;


    p {
        text-align: left;
        margin-top: 1.6rem;
        margin-bottom: 0.2rem;
        font-weight: 650;
        padding-left: 0.3rem;
    }

    input {
        width: 16.5rem;
        height: 1.8rem;
        border-radius: 0.5rem;
        border: 1px solid #444444;
        background-color: #fcf9f8;
        padding-left: 0.5rem;
        opacity: 0.6;
    }

    //번호 화살표 없애는 코드
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }

    button {
        margin-top: 0.6rem;
        width: 5rem;
        height: 1.5rem;
        border-radius: 0.7rem;
        border: 0.5px solid #6d6d6d;
        font-size: 0.8rem;
        font-weight: 500;
        background-color: #fffaf9;
    }

    div {
        display: flex;
        align-items: center;
    }

    .message {
        margin: 0;
        margin-top: 0.75rem;
        font-size: 0.7rem;
        padding-left: 0.5rem;
    }
`

const Button = styled.button`
    margin-top: 1.5rem;
    width: 17rem;
    height: 2.5rem;
    font-size: 1.2rem;
    font-weight: 550;
    border-radius: 0.8rem;
    border: 1px solid #a5a5a5;
    background-color: #e08644;
    box-shadow: 0 5px 18px -7px #838383;
    margin-bottom: 3rem;
`