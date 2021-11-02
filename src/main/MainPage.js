import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { makeStyles } from "@mui/material";
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { AppBar, Typography } from '@mui/material';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom';

import Covid19Page from './covid19-page/Covid19Page';
import SavedPage from './saved-page/SavedPage';
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
  link: PropTypes.isRequired,
  activeLink: PropTypes.string,
  label: PropTypes.isRequired,
};

const MainPage = () => {
  const classes = useStyles();

  const [allData, setAllData] = useState();

  const getData = async () => {
    const getNewsAPI = await axios.get(process.env.REACT_APP_NEWS_API);
    const getProgrammingAPI = await axios.get(
      process.env.REACT_APP_PROGRAMMING_API
    );
    const getCovidAPI = await axios.get(process.env.REACT_APP_COVID_API);

    await axios.all([getNewsAPI, getProgrammingAPI, getCovidAPI]).then(
      axios.spread((...allData) => {
        setAllData(allData);
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(allData);

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="fixed" color="default">
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
        </AppBar>
        <Switch>
          <div className="mt-28 mx-6">
            <Route exact path="/" render={() => <NewsPage data={allData} />} />
            <Route
              path="/programming-page"
              render={() => <ProgrammingPage data={allData} />}
            />
            <Route
              path="/covid19-page"
              render={() => <Covid19Page data={allData} />}
            />
            <Route path="/saved-page" component={SavedPage} />
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default MainPage;
