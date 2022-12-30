import styled from "styled-components";
import type { PriceData } from "../model/PriceData";
import { InfoData } from "./../model/InfoData";

interface PriceProps {
  priceData?: PriceData;
  infoData?: InfoData;
}

const Container = styled.div`
  border: 5px solid;
  border-radius: 10px;
  border-color: ${(props) => props.theme.boxColor};
  span{
    display: block;
  }
`;

function Price({ priceData, infoData }: PriceProps) {
  console.log("price");
  return (
    <Container>
      <span>{priceData?.id}</span>
      <span>{priceData?.quotes.USD.ath_date}</span>
      <span>{priceData?.quotes.USD.ath_price}</span>
      <span>{priceData?.quotes.USD.price}</span>
      <span>{priceData?.quotes.USD.percent_change_12h}</span>
      <span>{priceData?.quotes.USD.percent_change_15m}</span>
      <span>{priceData?.quotes.USD.percent_change_1h}</span>
    </Container>
  );
}

export default Price;
