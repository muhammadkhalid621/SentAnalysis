import React from 'react'
import styled from "styled-components";
import { themeColor } from "../utils";
function Badge({content}) {
    return (
        <Div>
            {content}
        </Div>);
   
}
const Div = styled.div`
  padding: 1rem 1rem;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 10px;
  color: white;
  background-color: #587A8100;
  cursor: pointer;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    
  }
  `;
export default Badge
