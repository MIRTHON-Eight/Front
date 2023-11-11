import axios from "axios";
import { Container } from "../styles/global";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Top = styled.div`
  display: relative;
  margin-left: -200px;
  margin-top: 150px;

  img {
    width: 8.8rem;
    height: 4.8rem;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 650;
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  background-color: #fffaf7;
  width: 17.5rem;
  height: 13rem;
  padding: 1rem 1.5rem;
  border-radius: 1.8rem;
  box-shadow: 0 5px 18px -7px #c9c9c9;
  font-weight: 600;

  p {
    text-align: left;
    margin-top: 1.3rem;
    margin-bottom: 0.5rem;
    font-weight: 650;
  }

  input {
    width: 16.5rem;
    height: 2rem;
    border-radius: 0.5rem;
    border: 1px solid #444444;
    background-color: #fcf9f8;
    padding-left: 0.5rem;
    opacity: 0.6;
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
`;

const Write = styled.div`
  margin-top: 12px;
  margin-left: 12px;
  font-size: 0.8rem;
  font-weight: 650;
  color: #696969;

  .link {
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

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
`;

function Login() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/Signup");
  };
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!userName || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return; // Stop further execution
    }

    try {
      const response = await axios.post(
        "http://13.124.196.200:8081/api/login",
        {
          password: password,
          userName: userName,
        }
      );

      const isSuccess = response.data.isSuccess;
      if (isSuccess) {
        const memberid = response.data.result.memberId; // 아이디 받기
        localStorage.setItem("memberid", memberid); // 아이디 저장
        const token = response.data.result.token; // 토큰 받기
        localStorage.setItem("token", token); // 토큰 저장
        navigate("/"); // 로그인하면 홈 페이지 이동
      } else {
        // Handle login failure
        const errorCode = response.data.code;
        const errorMessage = response.data.message;

        if (errorCode === 404) {
          alert("존재하지 않은 아이디입니다.");
        } else if (errorCode === 401) {
          alert("잘못된 비밀번호입니다.");
        } else {
          alert(`로그인 실패: ${errorMessage}`);
        }
      }
    } catch (error) {
      alert("아이디와 비밀번호를 다시 확인해주세요.");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Top>
          <img src={logo} alt="Bver" />
          <p>로그인</p>
        </Top>
        <Input>
          <p>아이디</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="아이디를 입력해주세요."
          />
          <p>비밀번호</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
          />
        </Input>
        <Button onClick={handleLogin}>로그인</Button>

        <Write>
          <span className="link" onClick={handleLoginClick}>
            회원가입
          </span>
        </Write>
      </Container>
    </motion.div>
  );
}
export default Login;
