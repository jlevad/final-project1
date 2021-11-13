import NewsCard from "../component/NewsCard";
import axios from "axios";
import { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';

const ProgrammingPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);

  const getData = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_API}everything?q=programming&apiKey=${process.env.REACT_APP_API_KEY}`)
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

  return (
    <section id="programming_page">
      {loading ?
        <div className="mt-8 md:mt-40 md: mx-20">
          <LinearProgress />
        </div>
        : data.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, i) => <NewsCard item={item} />)}
          </div>
        ) : 'data tidak ditemukan'}
    </section>
  );
};

export default ProgrammingPage;
