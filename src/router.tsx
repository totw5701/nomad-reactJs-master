import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  toggleDark: () => void;
}

function Router({ toggleDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin toggleDark={toggleDark} />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
