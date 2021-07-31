import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import AuthApp from "./AuthApp";
import {UserProvider} from "./context/user";
import {login} from "./pages/login";


const authApp = () => <UserProvider>
    <AuthApp/>
</UserProvider>

const App = () => (
    <BrowserRouter>
      <Switch>
          <Route path="/login" component={login} exact />
          <Route path="/(.)*" component={authApp} />
          <Route path="/" component={<Redirect to="/login"/>} exact />
      </Switch>
    </BrowserRouter>
);

export default App;
