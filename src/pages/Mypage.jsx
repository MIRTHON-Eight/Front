import axios from "axios";
import { Container } from "../styles/global";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import back from "../assets/back.png";
import account from "../assets/account.svg";
import bread from "../assets/bread.jpg";
import heart from "../assets/Favorite.svg";
import bv from "../assets/bv.png";

const Back = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  cursor: pointer;

  img {
    margin-left: -320px;
    margin-top: -12px;
    width: 14px;
    height: 21px;
  }
`;

const Logo = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -40px;

  img {
    margin-left: 2.7rem;
    margin-right: 2.7rem;
    width: 5.8rem;
    height: 3.4rem;
  }
`;

const Box = styled.div`
  position: relative;
  margin-top: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 340px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(105, 105, 105, 0.2);
`;

const Profile = styled.div`
  img {
    width: 60px;
    margin-left: -240px;
    margin-top: 20px;
  }
`;

const Name = styled.div`
  color: #ff9633;
  font-size: 20px;
  font-weight: 650;
  text-shadow: 2px 2px 4px rgba(172, 172, 172, 0.1);
  margin-top: -58px;
  margin-left: 105px;
  text-align: left;
`;

const Logout = styled.div`
  font-size: 10px;
  text-shadow: 2px 2px 4px rgba(172, 172, 172, 0.1);
  margin-top: -40px;
  margin-left: 150px;
  text-align: left;

  .link {
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Phone = styled.div`
  font-size: 15px;
  margin-top: 4px;
  margin-left: 105px;
  text-align: left;
`;

const TownName = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: 600;
  margin-left: -285px;
  margin-top: 30px;
  margin-bottom: 0px;
  text-align: left;
  padding-right: 20px;
`;

const Town = styled.div`
  position: relative;
  font-size: 12px;
  margin-top: -18px;
  margin-left: -200px;
  text-align: left;
`;

const Reservation = styled.div`
  position: relative;
  margin-top: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 340px;
  height: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(143, 143, 143, 0.2);
  text-decoration: none;
`;

const PostBox = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  height: 60px;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 4px rgba(107, 107, 107, 0.2);
  cursor: pointer;
`;

const PostBox1 = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  height: 80px;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 4px rgba(107, 107, 107, 0.2);
  cursor: pointer;
`;

const PostImg = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 10px 0px 0px 10px;
  overflow: hidden;
`;

const ScrollBox = styled.div`
  width: 340px;
  height: 350px;
  margin-top: 0.2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    /* WebKit 브라우저의 스크롤바를 숨김 */
    width: 0;
    background: transparent;
  }
  padding-bottom: 20px;
`;

const ScrollBox1 = styled.div`
  width: 350px;
  height: 280=px;
  margin-top: 0.2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    /* WebKit 브라우저의 스크롤바를 숨김 */
    width: 0;
    background: transparent;
  }
  padding-bottom: 20px;
`;

const Name_b = styled.div`
  position: relative;
  top: -55px;
  left: 95px;
  color: #000000;
  font-size: 15px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-align: left;
`;

const Name_b1 = styled.div`
  position: relative;
  top: 20px;
  left: 23px;
  color: #000000;
  font-size: 15px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-align: left;
`;

const Address = styled.div`
  position: relative;
  top: -52px;
  left: 95px;
  color: black;
  font-size: 11px;
  font-style: normal;
  line-height: normal;
  text-align: left;
`;

const Address1 = styled.div`
  position: relative;
  top: -10px;
  left: -20px;
  color: black;
  font-size: 11px;
  font-style: normal;
  line-height: normal;
  text-align: right;
`;

const Heart = styled.div`
  margin-top: -108px;
  margin-left: 305px;
`;

// 하단바
const BottomBar = styled.div`
  background-color: #fff7f0;
  height: 52px;
  width: 390px;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -4px 6px rgba(177, 177, 177, 0.2); /* Use a negative margin-top to create the shadow effect on the bottom bar. */
`;

const BottomName = styled.div`
  margin-top: -5px;
  margin-left: -265px;
  img {
    width: 70px;
  }
`;

const Content = styled.div`
  position: relative;
  margin-top: -45px;
  margin-left: 25px;
  color: #ff7803;
  font-size: 15px;
  font-weight: 550;
  text-shadow: 2px 2px 4px rgba(104, 104, 104, 0.5);
`;

const Content2 = styled.div`
  position: relative;
  margin-top: 3px;
  margin-left: 25px;
  font-size: 11px;
`;

function Mypage() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  // 백엔드 연동 axios.get
  const [data, setData] = useState(null); // 단일 객체를 받기 위해 배열이 아닌 객체로 변경
  const { memberid } = useParams();
  const [reser, setReser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response1 = await axios.get(
          `http://13.124.196.200:8081/api/members/${memberid}`,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const response2 = await axios.get(
          `http://13.124.196.200:8081/api/reservations/list/${memberid}`
        );

        console.log("Received data from API:", response1.data);
        console.log(token);
        console.log(response1.data.result);
        console.log(response2.data.result);
        setData(response1.data.result); // 배열이 아닌 객체로 설정한 경우 변경
        setReser(response2.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 빵집 박스 클릭하면 해당 id의 빵집 세부로 넘어가도록
  const onClickDetail = (store_id) => {
    navigate(`/Detail/${store_id}`); // 해당 게시글의 ID를 URL에 포함하여 이동
  };
  

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("memberid");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        {data && (
          <>
            <Back onClick={handleHomeClick}>
              <img src={back} alt="back" />
            </Back>
            <Logo>
              <img src={logo} alt="Bver" />
            </Logo>
            <Box>
              <Profile>
                <img src={account} />
              </Profile>
              <Name>{data.member_info_res.nickname}</Name>
              <Phone>{data.member_info_res.address}</Phone>
              <Logout>
                <span className="link" onClick={handleLogoutClick}>
                  로그아웃
                </span>
              </Logout>
            </Box>

            <Reservation onClick={handleCartClick}>
              <p>장바구니</p>
            </Reservation>

            <TownName>{data.member_info_res.nickname}</TownName>
            <Town>님의 예약목록</Town>
            <ScrollBox1>
              {/* 연동 */}
              {reser &&
                reser.map((datas) => (
                  <PostBox
                    key={datas.store_id}
                  >
                    <Name_b1>{datas.store_name}</Name_b1>
                    <Address1>{datas.created_at}</Address1>
                  </PostBox>
                ))}
            </ScrollBox1>

            <TownName>{data.member_info_res.nickname}</TownName>
            <Town>님이 찜한 가게</Town>
            <ScrollBox>
              {/* 연동 */}
              {data &&
                data.my_bakery_list &&
                data.my_bakery_list.map((datas) => (
                  <PostBox1
                    key={datas.store_id}
                    onClick={() => onClickDetail(datas.store_id)}
                  >
                    <PostImg>
                      <img
                        //   src={`${process.env.PUBLIC_URL}/images/imgupload_post1.svg`}
                        src={datas.store_img}
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }} // 이미지 크기와 픽셀 사용 방식 설정
                      />
                    </PostImg>
                    <Name_b>{datas.store_name}</Name_b>
                    <Address>{datas.location}</Address>
                    <Heart>
                      <img src={heart} />
                    </Heart>
                  </PostBox1>
                ))}
            </ScrollBox>
            <BottomBar>
              <BottomName>
                <img src={bv} />
              </BottomName>
              <Content>우리가 왜 사용해야할까?</Content>
              <Content2>그 해답은 클릭하여 확인해 주세요</Content2>
            </BottomBar>
          </>
        )}
      </Container>
    </motion.div>
  );
}

export default Mypage;
