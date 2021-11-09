import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { makeStyles } from "@mui/material";
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { AppBar, Typography } from '@mui/material';
import {
  Route,
  Switch,
  // BrowserRouter as Router,
  NavLink,
  useHistory,
} from 'react-router-dom';

import Covid19Page from './covid19-page/Covid19Page';
import SavedPage from './saved-page/SavedPage';
import ProgrammingPage from './programming-page/ProgrammingPage';
import NewsPage from './news-page/NewsPage';
import SearchPage from './search-page/SearchPage';

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
  link: PropTypes.isRequired,
  activeLink: PropTypes.string,
  label: PropTypes.isRequired,
};

const MainPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [allData, setAllData] = useState();
  const [saved, setSaved] = useState([]);
  const [isSaved, setIsSaved] = useState({});
  const [query, setQuery] = useState();
  const [results, setResults] = useState();

  const getData = async () => {
    const getNewsAPI = await axios.get(
      `${process.env.REACT_APP_BASE_API}/top-headlines?country=id&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const getProgrammingAPI = await axios.get(
      `${process.env.REACT_APP_BASE_API}/everything?q=covid-19&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const getCovidAPI = await axios.get(
      `${process.env.REACT_APP_BASE_API}/everything?q=programming&apiKey=${process.env.REACT_APP_API_KEY}`
    );

    await axios.all([getNewsAPI, getProgrammingAPI, getCovidAPI]).then(
      axios.spread((...allData) => {
        setAllData(allData);
      })
    );
  };

  const searchNews = async (e) => {
    e.preventDefault();
    history.push('/search');
    await axios
      .get(
        `${process.env.REACT_APP_BASE_API}/everything?q=${query}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => setResults(res.data.articles));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <div className="container-navbar flex justify-between items-center">
          <div className="flex flex-row">
            <LinkTabs link="/" label="News Page" activeLink="text-blue-500" />
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
          <div className="input_search mr-6">
            <form action="search-query" onSubmit={searchNews}>
              <input
                required
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="border-2 border-black rounded-md p-1 text-sm"
              />
              <input
                type="submit"
                value="Search"
                className="bg-yellow-500 py-1 px-2 ml-2 rounded-md cursor-pointer"
              />
            </form>
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
                data={allData}
                setSaved={setSaved}
                saved={saved}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
              />
            )}
          />
          <Route
            path="/programming-page"
            render={() => (
              <ProgrammingPage
                data={allData}
                setSaved={setSaved}
                saved={saved}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
              />
            )}
          />
          <Route
            path="/covid19-page"
            render={() => (
              <Covid19Page
                data={allData}
                setSaved={setSaved}
                saved={saved}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
              />
            )}
          />
          <Route
            path="/saved-page"
            render={() => <SavedPage saved={saved} />}
          />
          <Route path="/search" render={() => <SearchPage data={results} />} />
        </div>
      </Switch>
    </div>
  );
};

export default MainPage;
