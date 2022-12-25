import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  logo: string;
  parent: object;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
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

const Tab = styled.span<{isActive:boolean}>`
  text-align: center;
  background-color: ${props => props.isActive ? props.theme.accentColor : (props.theme.boxColor)};
  padding: 5px;
  border-radius: 10px;
  font-weight: 600;
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [infoData, setInfoData] = useState<InfoData>();
  const [priceData, setPriceData] = useState<PriceData>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfoData(infoData);
      setPriceData(priceData);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading ..." : infoData?.name}
        </Title>
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
              <span>OPEN SOURCE:</span>
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>

          <Description>
            <p>{infoData?.description}</p>
          </Description>

          <Overview>
            <OverviewItem>
              <span>TOTAL SUPLY:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPLY:</span>
              <span>{priceData?.max_supply}</span>
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
              <Price />
            </Route>
            <Route path="/:coinId/chart">
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
