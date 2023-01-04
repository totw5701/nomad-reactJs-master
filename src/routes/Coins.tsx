import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./../api";
import { ICoinProps } from "../model/ICoinProps";


const ToogleBtn = styled.button`
  background-color: ${props => props.theme.boxColor};
  color: white;
  font-size: smaller;
  width: 100px;
  height: 25px;
  grid-area: toggle-btn;
`

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: ". title toggle-btn";
  align-items: center;
  justify-content: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 10px;
  a {
    padding: 20px;
    transition: color 0.3s ease-in-out;
    display: flex;
    align-items: center;
    font-weight: 400;
  }
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    a {
      color: ${(props) => props.theme.bgColor};
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  grid-area: title;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 30px;
  font-weight: 400;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins({ toggleDark }: ICoinProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <ToogleBtn onClick={toggleDark}>ToggleTheme</ToogleBtn>
      </Header>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="noImg"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
