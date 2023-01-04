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

const InfoBox = styled.div`
padding: 10px;
  display: flex;
  span:first-child {
    margin-right: 10px;
    font-weight: 600;
  }
`;

function Price({ priceData, infoData }: PriceProps) {
  return (
    <Container>
      <InfoBox><span>ID : </span><span>{priceData?.id}</span></InfoBox>
      <InfoBox><span>Ath_date : </span><span>{priceData?.quotes.USD.ath_date}</span></InfoBox>
      <InfoBox><span>Ath_price : </span><span>{priceData?.quotes.USD.ath_price}</span></InfoBox>
      <InfoBox><span>Price : </span><span>{priceData?.quotes.USD.price}</span></InfoBox>
      <InfoBox><span>Change % (12h) : </span><span>{priceData?.quotes.USD.percent_change_12h}</span></InfoBox>
      <InfoBox><span>Change % (15m) : </span><span>{priceData?.quotes.USD.percent_change_15m}</span></InfoBox>
      <InfoBox><span>Change % (1h) : </span><span>{priceData?.quotes.USD.percent_change_1h}</span></InfoBox>
      <InfoBox><span>Change % (1y) : </span><span>{priceData?.quotes.USD.percent_change_1y}</span></InfoBox>
      <InfoBox><span>Change % (24h) : </span><span>{priceData?.quotes.USD.percent_change_24h}</span></InfoBox>
      <InfoBox><span>Change % (30d) : </span><span>{priceData?.quotes.USD.percent_change_30d}</span></InfoBox>
      <InfoBox><span>Change % (30m) : </span><span>{priceData?.quotes.USD.percent_change_30m}</span></InfoBox>
      <InfoBox><span>Change % (6h) : </span><span>{priceData?.quotes.USD.percent_change_6h}</span></InfoBox>
      <InfoBox><span>Change % (7d) : </span><span>{priceData?.quotes.USD.percent_change_7d}</span></InfoBox>
    </Container>
  );
}

export default Price;
