import './App.css';

import { FC } from "react"
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import EventsPage from './pages/EventsPage';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';



const App: FC = () => {

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path={"/new"} >
            <CreateEventPage />
          </Route>

          <Route path={"/edit/:id"} >
            <EditEventPage />
          </Route>

          <Route path={"/view/:id"} >
            <EventPage />
          </Route>

          <Route path="/">
            <EventsPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )

}

export default App;
