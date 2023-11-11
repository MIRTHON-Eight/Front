import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../styles/global";
import logo from "../assets/logo.png";
import account from "../assets/account.svg";
import bread from "../assets/bread.jpg";
import bv from "../assets/bv.png";
import closingsale from "../assets/마감세일사진.png";
import gift from "../assets/수능선물.jpg";
import milk from "../assets/우유빵.png";

const Top = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
  margin-left: -250px;

  img {
    width: 8.8rem;
    height: 4.8rem;
  }
`;
const HomeImg = styled.div`
  position: relative;
  left: 155px;
  top: -55px;
  img {
    width: 38px;
    cursor: pointer;
  }
`;

// 광고
const Adver = styled.div`
  background-color: #fff7f0;
  display: flex;
  height: 150px;
  border-radius: 1rem;
  box-shadow: 1px 4px 6px rgba(102, 102, 102, 0.2);
  width: 22.2rem;
  margin-top: -25px;

  div {
    display: flex;
    flex-direction: column;
    width: 14rem;

    h2 {
      margin: 0;
      margin-top: 1.5rem;
      color: #ff7803;
      text-shadow: 2px 2px 4px rgba(190, 190, 190, 0.5);
    }

    p {
      margin: 0;
      margin-top: 1rem;
      font-size: 0.8rem;
    }

    .extra {
      margin-top: 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  img {
    width: 12rem;
    height: 150px;
    border-radius: 0 1rem 1rem 0;
  }
`;

// 마감세일중인 빵집
const HeartTown = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: -215px;
  margin-top: 25px;
  margin-bottom: 10px;
`;

const HeartBox = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  width: 130px;
  height: 181px;
  border-radius: 10px;
  margin-left: 20px;
`;

const HeartImg = styled.div`
  position: relative;
  width: 130px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
`;

const HeartBoxs = styled.div`
  display: flex; // 이 부분을 추가하여 가로로 정렬
  overflow-x: auto; // 가로 스크롤을 활성화합니다.
  width: 375px;
  //   border: 1px solid #000;
  &::-webkit-scrollbar {
    /* WebKit 브라우저의 스크롤바를 숨김 */
    width: 0;
    background: transparent;
  }
`;

const HeartName = styled.div`
  position: relative;
  background-color: #fff7f0;
  border-radius: 0 0 10px 10px;
  top: -25px;
  padding-top: 4px;
  font-size: 14px;
  height: 1.3199rem;
  font-weight: bold;
  line-height: normal;
  text-align: center;
`;

// 우리동네빵집
const Town = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: -235px;
  margin-top: 20px;
  margin-bottom: 0px;
`;

const PostBox = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  height: 80px;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 4px rgba(107, 107, 107, 0.2);
`;

const PostImg = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 10px 0px 0px 10px;
  overflow: hidden;
`;

const ScrollBox = styled.div`
  width: 330px;
  height: 255px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    /* WebKit 브라우저의 스크롤바를 숨김 */
    width: 0;
    background: transparent;
  }
  padding-bottom: 20px;
`;

const Name = styled.div`
  position: relative;
  top: -60px;
  left: 93px;
  color: #000000;
  font-size: 15px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-align: left;
  //text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Address = styled.div`
  position: relative;
  top: -56px;
  left: 93px;
  color: black;
  font-size: 12px;
  font-style: normal;
  line-height: normal;
  text-align: left;
`;

//하단 바
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

function Home() {
  const navigate = useNavigate();
  const advertisements = [
    {
      id: "adv1",
      title: "오늘의 제빵소",
      description: "3만원 이상 구매 시",
      extraDescription: "3000원 할인",
      img: closingsale,
    },
    {
      id: "adv2",
      title: "외계인 방앗간",
      description: "2023 수능 선물은",
      extraDescription: "외계인 방앗간에서",
      img: gift,
    },
    {
      id: "adv3",
      title: "모어 댄 밀크",
      description: "신선한 우유와 버터를 사용하여",
      extraDescription: "풍미 가득한 빵",
      img: milk,
    },
  ];

  const [currentAdvIndex, setCurrentAdvIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdvIndex(
        (prevIndex) => (prevIndex + 1) % advertisements.length
      );
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentAdvertisement = advertisements[currentAdvIndex];

  // 백엔드 연동 axios.get
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const memberid = localStorage.getItem("memberid");
        const response = await axios.get(
          "http://13.124.196.200:8081/api/bakery",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Received data from API:", response.data);
        console.log(token);
        console.log(memberid);
        setDatas(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 빵집 박스 클릭하면 해당 id의 빵집 세부로 넘어가도록
  const onClickDetail = (store_id) => {
    navigate(`/detail/${store_id}`); // 해당 게시글의 ID를 URL에 포함하여 이동
  };

  //회원 정보에 따라 마이페이지 내용 변경
  const memberid = localStorage.getItem("memberid");
  const onClickMy = () => {
    navigate(`/Mypage/${memberid}`);
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
        </Top>
        <HomeImg key={memberid} onClick={onClickMy}>
          <img src={account} alt="account" />
        </HomeImg>

        {/* 광고 */}
        <Adver id={currentAdvertisement.id}>
          <div>
            <h2>{currentAdvertisement.title}</h2>
            <p>{currentAdvertisement.description}</p>
            <p className="extra">{currentAdvertisement.extraDescription}</p>
          </div>
          <img src={currentAdvertisement.img} />
        </Adver>

        {/* 마감세일중인 빵집 */}
        <HeartTown>마감세일 중인 빵집</HeartTown>
        <HeartBoxs>
          <HeartBox>
            <HeartImg>
              <img
                src={bread}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
              />
            </HeartImg>
            <HeartName>오늘의 제빵소</HeartName>
          </HeartBox>
        </HeartBoxs>

        {/* 이 부분 백엔드 연동중임 */}
        {/* 우리동네빵집 */}
        <Town>우리 동네 빵집</Town>
        <ScrollBox>
          {datas.map((data) => (
            <PostBox
              key={data.store_id}
              onClick={() => onClickDetail(data.store_id)}
            >
              <PostImg>
                <img
                  src={`${data.writerProfile}`}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
                />
              </PostImg>
              <Name>{data.store_name}</Name>
              <Address>{data.location}</Address>
            </PostBox>
          ))}
        </ScrollBox>

        {/* 하단바 */}
        <BottomBar>
          <BottomName>
            <img src={bv} />
          </BottomName>
          <Content>우리가 왜 사용해야할까?</Content>
          <Content2>그 해답은 클릭하여 확인해 주세요</Content2>
        </BottomBar>
      </Container>
    </motion.div>
  );
}

export default Home;
