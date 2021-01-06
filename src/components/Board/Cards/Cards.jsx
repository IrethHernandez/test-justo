import React, { useState, useEffect } from "react";
import { imageCards, coverCard } from '../../../images'
import styled from 'styled-components'


const Cards = (props) => {

    const GameContainer = styled.div`
        grid-template-columns: repeat(3, 1fr);
        display: grid;
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        position:relative;
        @media (min-width: 992px){
            grid-template-columns: repeat(6, 1fr);
        }
    `

    const Card = styled.div`
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        height: 116px;
        width: 90px;
        border-radius: 5px;
        box-shadow: 2px 2px 3px black;
        @media (min-width: 992px){
            height: 156px;
            width: 120px;
        }
    `

    const Modal = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0, 0.5);
    `

    const Article = styled.article`
        background: white;
        padding: 40px;
        text-align: center;
        font-size: 40px;
    `

    const ButtonReset =  styled.button`
        background: #fdc502;
        color: #134834;
        padding: 10px 15px;
        border: none;
        border-radius:0;
        text-transform: uppercase;
        display: block;
        margin: 20px auto;
        cursor: pointer;
    `

    const [selected, setSelected] = useState([]);
    const [end, setEnd] = useState(false);
    const [blockGame, setBlockGame] = useState(false);

    useEffect(() =>{
        resetGame();
    }, [])

    useEffect(() =>{
            console.info('block game!')
    }, [blockGame])

    useEffect(()=>{
        if(selected.length === 2 ){
            setBlockGame(true)
            imageCards[selected[0]]?.name === imageCards[selected[1]]?.name ? haveMatch() : noMatch();
        }
       if (imageCards.every(el => !!el.found)) {
            setEnd(true);
        } 
    }, [selected])

    const handleClick = (index) => {
        if(blockGame){
            return;
        }else{
            imageCards[index].flipped = true;
            setSelected([...selected, index])
        }
    };

    const haveMatch = () => {
        imageCards[selected[0]].found = true;
        imageCards[selected[1]].found = true;
        setBlockGame(false)
        setSelected([])
    } 
    
    const noMatch = () => {
        setTimeout(() => {
            imageCards[selected[0]].flipped = false;
            imageCards[selected[1]].flipped = false;
            setBlockGame(false)
            setSelected([])
            console.info(imageCards)
        }, 1000)
    }

    const resetGame = () => {
        imageCards.sort(() => Math.random() - 0.5)
        imageCards.map(card => { card.found = false; card.flipped = false})
        setSelected([])
        setEnd(false)
    }


    return (<GameContainer>
        { imageCards.map((card, index) => {
        return (
            <Card key={card.id} data-name={card.name} style={{ background: `url(${card.flipped ? card.pic : coverCard})` }} id={index} onClick={card.flipped ? null : (e) => handleClick(index, card)} />
            ) 
        })}
        {end &&
            <Modal>
                <Article>
                    <p>¡Ganaste!</p>
                    <ButtonReset onClick={()=> resetGame()}>Reiniciar</ButtonReset>    
                </Article>
            </Modal>
        }
    </GameContainer>)
} 

export default Cards;