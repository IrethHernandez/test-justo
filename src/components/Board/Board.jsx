import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import Cards from "./Cards/Cards";

const Board = () => {
    
    const Container = styled.article`
        position: relative;
        padding: 40px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `
    
    
    
    return (<Container>
            <Cards/>
        </Container>)
}
 
export default Board;