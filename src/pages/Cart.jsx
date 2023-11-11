import axios from "axios";
import { Container } from "../styles/global";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import back from "../assets/back.png";
import logo from "../assets/logo_detail.png";
import cart from "../assets/cart.png";
import choco from "../assets/초코소라빵.png";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import line from "../assets/line.png";

function Cart() {
    //수량 
    const [nums, setNums] = useState([]);

    const handleMinusClick = (index) => {
        if (nums[index] > 0) {
            const newNums = [...nums];
            newNums[index] = nums[index] - 1;
            setNums(newNums);
        }
    };

    const handlePlusClick = (index) => {
        const newNums = [...nums];
        newNums[index] = nums[index] + 1;
        setNums(newNums);
    };

    const getSelectedItems = () => {
        return storedItems.filter((item, index) => nums[index] > 0);
    };

    // 모달
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const modalBackground = useRef();

    // 예약시간
    const [selectedTime, setSelectedTime] = useState('');
    const handleReservation = () => {
        setModalOpen(false);
        setConfirmationModalOpen(true);
    };

    // 로컬데이터 GET
    const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
    useEffect(() => {
        const initialNums = storedItems.map(item => item.quantity || 0);
        setNums(initialNums);
    }, []);

    // 예약 post
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     axios
    //         .post('http://13.124.196.200:8081/api/reservations', {
    //             userId: ,
    //             storeId: bakeryId,
    //             breadId: ,
    //             breadType: ,
    //             quantity: ,
    //             pickUpTime: selectedTime 
    //         })
    //         .then((response) => {
    //             navigate('/');
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container>
                <Header>
                    <img src={back} alt="back" />
                    <Link to={'/'}><img src={logo} alt="Bver" /></Link>
                    <Link to={'/cart'}><img className='cart' src={cart} alt="cart" /></Link>
                </Header>

                <List>
                    <p className='storename'>{storedItems.length > 0 ? storedItems[0].storeName : ''}</p>
                    <img src={line} alt="" />
                    {storedItems.map((item, index) => (
                        <div className='items' key={index}>
                            <div>
                                <img className='photo' src={item.menuImg} alt={item.menu_name} />
                                <h3>{item.menuName}</h3>
                                <div className='priceNum'>
                                    <p>{item.price}원</p>
                                    <Amount>
                                        <img className='minus' src={minus} alt="" onClick={() => handleMinusClick(index)} />
                                        <p>{nums[index]}</p>
                                        <img src={plus} alt="" onClick={() => handlePlusClick(index)} />
                                    </Amount>
                                </div>
                            </div>
                            <img src={line} alt="" />
                        </div>
                    ))}
                </List>

                <Reservation onClick={() => setModalOpen(true)}>예약하기</Reservation>
                {modalOpen && (
                    <Modal>
                        <div>
                            <Link to={'/'}><button className='close' onClick={() => setModalOpen(false)}>X</button></Link>
                            <h3>예약목록을 확인하고 시간을 선택해주세요</h3>

                            {getSelectedItems().map((item, index) => (
                                <p key={index}>{item.menuName} {nums[index]}개</p>
                            ))}

                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            >
                                <option value="10">10분 후</option>
                                <option value="20">20분 후</option>
                                <option value="30">30분 후</option>
                            </select>
                            <button className='reservation' onClick={handleReservation}>예약하기</button>
                        </div>
                    </Modal>
                )}
                {confirmationModalOpen && (
                    <ConfirmModal>
                        <div>
                            <h3>예약 완료</h3>
                            <p>예약이 성공적으로 완료되었습니다!</p>
                            <p className="visittext">{selectedTime}분 후에 매장에 방문해주시길 바랍니다.</p>
                            <Link to={'/'}>
                                <button className='close' onClick={() => setConfirmationModalOpen(false)}>확인</button>
                            </Link>
                        </div>
                    </ConfirmModal>
                )}
            </Container>
        </motion.div>
    );
};
export default Cart;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.5rem;

    img {
        margin-left: 3rem;
        margin-right: 3rem;
    }

    .cart {
        width: 35px;
        height: 35px;
        padding-top: 0.6rem;
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    padding: 0.5rem;
    background-color: #fff7f0;
    width: 390px;

    .storename {
        text-align: left;
        padding-left: 2rem;
        font-size: 1.1rem;
        margin: 0.5rem 0;
    }

    .items {
        display: flex;
        flex-direction: column;
    }

    div {
        display: flex;
        align-items: center;

        h3 {
        margin-left: 1rem;
        padding-right: 4rem;
        font-size: 15px;
        font-weight: 500;
        }
    }

    img {
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
    }

    .photo {
        width: 90px;
        height: 90px;
        border-radius: 1rem;
        margin: 0.5rem 0;
    }

    .priceNum {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        p {
        margin: 0;
        margin-left: 1rem;
        margin-right: 1rem;
        font-weight: 600;
        }
    }
    `;

const Amount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #a5a5a5;
    border-radius: 1rem;
    width: 7rem;
    height: 1.4rem;
    margin-top: 0.5rem;
    padding-top: 0.18rem;

    p {
        font-size: 1rem;
    }

    img {
        width: 10px;
        height: 10px;
        padding: 0.5rem 0.5rem;
        margin: 0;
    }

    .minus {
        width: 12px;
        height: 1px;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
`;

const Reservation = styled.button`
    margin: 2rem;
    margin-bottom: 3rem;
    width: 17rem;
    height: 2.5rem;
    font-size: 1.2rem;
    font-weight: 550;
    border-radius: 0.8rem;
    border: 1px solid #a5a5a5;
    background-color: #e08644;
    box-shadow: 0 5px 18px -7px #838383;
    `;

const Modal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff9f5;
        width: 250px;
        height: auto;
        padding: 5px;
        border-radius: 0.5rem;
    }

    h3 {
        width: 10rem;
        margin: 0;
        margin-bottom: 0.5rem;
        font-size: 14px;
    }

    p {
        margin: 0.5rem;
    }

    .close {
        cursor: pointer;
        margin-left: 14.5rem;
        font-size: 0.7rem;
        color: #e08644;
        background-color: #fff9f5;
        border: none;
    }

    select {
        margin-top: 0.7rem;
        width: 8rem;
        height: 2rem;
        border-radius: 0.5rem;
        font-size: 15px;
    }

    .reservation {
        margin-top: 1rem;
        margin-bottom: 1rem;
        width: 6rem;
        height: 1.8rem;
        font-size: 0.8rem;
        font-weight: 550;
        border-radius: 0.8rem;
        border: 1px solid #a5a5a5;
        background-color: #e08644;
        box-shadow: 0 5px 18px -7px #838383;
    }
`

const ConfirmModal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff9f5;
        width: 250px;
        height: auto;
        padding: 5px;
        border-radius: 0.5rem;
    }

    h3 {
        margin: 0;
        margin-top: 2rem;
    }

    p {
        margin-top: 2rem;
    }

    .visittext {
        width: 12rem;
        margin-top: 0;
    }

    button {
        margin: 1rem;
        margin-bottom: 1rem;
        width: 4rem;
        height: 1.8rem;
        font-size: 0.8rem;
        font-weight: 550;
        border-radius: 0.8rem;
        border: 1px solid #a5a5a5;
        background-color: #e08644;
        box-shadow: 0 5px 18px -7px #838383;
    }
`;
