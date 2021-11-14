// import { makeStyles } from "@mui/material";
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { AppBar, TextField, Typography } from '@mui/material';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


import Covid19Page from './covid19-page/Covid19Page';
import SavedPage from './saved-page/SavedPage';
import SearchPage from './search-page/SearchPage';
import ProgrammingPage from './programming-page/ProgrammingPage';
import NewsPage from './news-page/NewsPage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

const LinkTabs = (props) => {
  const { link, label, activeLink } = props;
  return (
    <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300">
      <NavLink exact to={link} activeClassName={activeLink}>
        <Typography variant="h6">{label}</Typography>
      </NavLink>
    </div>
  );
};

LinkTabs.propTypes = {
  link: PropTypes.string.isRequired,
  activeLink: PropTypes.string,
  label: PropTypes.string.isRequired,
};

const MainPage = () => {
  const classes = useStyles();
  const [valueSearch, setValueSearch] = useState('');
  const [data, setData] = useState([]);
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);

  const searchNews = async () => {
    setLoading(true);
    history.push('/search-page');
    await axios.get(`${process.env.REACT_APP_BASE_API}everything?q=${valueSearch}&apiKey=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        setData(response.data.articles);
        setLoading(false);
      }).catch((error) => {
        setData([]);
        setLoading(false);
      })
  };

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="fixed" color="default">
          <div className="container-navbar flex justify-between items-center">
            <div className="flex flex-row">
              <LinkTabs
                link="/"
                label="Indonesia"
                activeLink="text-blue-500"
              />
              <LinkTabs
                link="/programming-page"
                label="Programming"
                activeLink="text-blue-500"
              />
              <LinkTabs
                link="/covid19-page"
                label="Covid-19"
                activeLink="text-blue-500"
              />
              <LinkTabs
                link="/saved-page"
                label="Saved"
                activeLink="text-blue-500"
              />
            </div>
            <div className="input_search mr-6 flex justify-center items-center">
              <TextField
                label="search news"
                size="small"
                id="outlined-start-adornment"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
              />
              <IconButton aria-label="search" onClick={() => searchNews()} size="large">
                <SearchIcon color="warning" />
              </IconButton>
            </div>
          </div>
        </AppBar>
        <Switch>
          <div className="mt-28 mx-6">
            <Route
              exact
              path="/"
              render={() => (
                <NewsPage
                  valueSearch={valueSearch}
                  setHistory={setHistory}
                  title="Indonesia"
                />
              )}
            />
            <Route
              path="/programming-page"
              render={() => (
                <ProgrammingPage
                  valueSearch={valueSearch}
                  title="Programming"
                />
              )}
            />
            <Route
              path="/covid19-page"
              render={() => (
                <Covid19Page
                  valueSearch={valueSearch}
                  title="COVID19"
                />
              )}
            />
            <Route path="/saved-page" render={() => (
              <SavedPage
                valueSearch={valueSearch}
                title="Saved"
              />
            )} />
            <Route
              path="/search-page"
              render={() => (
                <SearchPage
                  data={data}
                  loading={loading}
                  title={valueSearch}
                />
              )}
            />
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default MainPage;
