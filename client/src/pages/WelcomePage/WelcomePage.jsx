import React, { useState } from "react";
import { Button, Flex, Text, Title } from "./Welcome.styled";
import Slider from "react-slick";
import "./Carousel.css";

import LeftArrow from "../../images/Arrow/Vector.svg";
import RightArrow from "../../images/Arrow/Vector-1.svg";
import Genre from "../../components/Genre/Genre";
import Modal from "../../components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { changeGenre } from "../../redux/bookSlice";

export const Container = styled.div`
  width: 100%;
  border: 1px solid #e8d3b9;
  border-radius: 45px;
  background-color: #fffdfa;
  padding: 57px 75px;
`;

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState({});
  let books = useSelector((state) => state.book.books);
  let resultBooks = books.slice(0, 9);

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src={LeftArrow} alt="" />
      </div>
    );
  };
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <img src={RightArrow} alt="" />
      </div>
    );
  };

  const [nextIndex, setNextIndex] = useState(0);
  const [preventImage, setPreventImage] = useState(8);

  const setting = {
    infinity: true,
    lazyload: true,
    speed: 300,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: "20px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (prevent, next) => {
      setNextIndex(next);
      setPreventImage(prevent);
      console.log(prevent);
      console.log(next);
    },
  };
  return (
    <Container>
      <Modal
        isOpened={modal}
        book={book}
        onModalClose={() => setModal(false)}
      />
      <Flex bottom={"4em"}>
        <Flex column={"column"} width={"241px"}>
          <Title bottom={"11px"}>Бестселлеры</Title>
          <Text bottom={"20px"}>
            Окунитесь в мир лучших книг в мире по мнению миллионов читателей и
            решите так ли это на самом деле. <br /> Только утро настало, как
            читать захотелось.
          </Text>
          <Button
            onClick={() => {
              dispatch(changeGenre("Бестселлеры"));
              navigate("/genre");
            }}
          >
            Смотреть
          </Button>
        </Flex>
        <Slider {...setting} style={{ width: "800px", margin: "2em auto 0" }}>
          {resultBooks.map((book, idx) => (
            <div
              onClick={() => {
                setModal(true);
                setBook(book);
              }}
              key={idx}
              className={
                idx === nextIndex
                  ? "slide activeSlide"
                  : idx === nextIndex + 1 ||
                    idx === nextIndex - 1 ||
                    idx === preventImage ||
                    (idx === 8 && nextIndex === 0) ||
                    (idx === 0 && nextIndex === 8)
                  ? "slide activeMidleSlide"
                  : "slide"
              }
            >
              <img src={book.img} alt={book.img} />
            </div>
          ))}
        </Slider>
      </Flex>
      <Genre category={"Фантастика"} />
      <Genre flexDirection={"row-reverse"} category={"Романтика"} />
    </Container>
  );
};

export default WelcomePage;
