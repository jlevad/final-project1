import { useEffect, useState } from "react";
import axios from 'axios';
import NewsCard from "../component/NewsCard";
import LinearProgress from '@mui/material/LinearProgress';
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";

const NewsPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const _history = useHistory();
  props.setHistory(_history);

  const getData = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_API}top-headlines?country=id&apiKey=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        setData(response.data.articles);
        setLoading(false);
      }).catch((error) => {
        setData([]);
        setLoading(false);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  // console.log(data);
  return (
    <section id="news_page">
      <div className="text-center">
        <Typography variant="h4">
          {props.title} News
        </Typography>
      </div>
      {loading ?
        <div className="mt-8 md:mt-40 md: mx-20">
          <LinearProgress />
        </div>
        : data.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, i) => (
              <NewsCard
                item={item}
                setSaved={props.setSaved}
                saved={props.saved}
                isSaved={props.isSaved}
                setIsSaved={props.setIsSaved}
              />
            ))}
          </div>
        ) : 'data tidak ditemukan'}
    </section>
  );
};

export default NewsPage;
