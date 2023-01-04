import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTicker } from "./../api";
import { Helmet } from "react-helmet";
import type { PriceData } from "../model/PriceData";
import type { InfoData } from "../model/InfoData";
import { ICoinProps } from "../model/ICoinProps";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  button {
    background-color: ${(props) => props.theme.boxColor};
    color: white;
    font-size: smaller;
    width: 100px;
    height: 25px;
  }
  justify-items: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 30px;
  font-weight: 400;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Overview = styled.article`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 5px 20px;
  border-radius: 9px;
`;

const OverviewItem = styled.div`
  text-align: center;
  span {
    display: block;
    color: ${(props) => props.theme.textColor};
    font-size: medium;
    font-weight: 600;
  }
  span:first-child {
    font-size: 9px;
  }
`;

const Description = styled.article`
  margin: 20px 0px;
  p {
    font-weight: 400;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 15px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.boxColor};
  padding: 5px;
  border-radius: 10px;
  font-weight: 600;
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const BackPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

function Coin({ toggleDark }: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
    ["ticker", coinId],
    () => fetchCoinTicker(coinId),
    { refetchInterval: 5000 } //5000마다 조회
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading ..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackPage>
          <Link to="/">BACK</Link>
        </BackPage>
        <Title>
          {state?.name ? state.name : loading ? "Loading ..." : infoData?.name}
        </Title>
        <button onClick={toggleDark}>ToggleTheme</button>
      </Header>
      {loading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE:</span>
              <span>{tickerData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>

          <Description>
            <p>{infoData?.description}</p>
          </Description>

          <Overview>
            <OverviewItem>
              <span>TOTAL SUPLY:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPLY:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path="/:coinId/price">
              <Price priceData={tickerData} infoData={infoData} />
            </Route>
            <Route path="/:coinId/chart">
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
