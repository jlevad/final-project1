import NewsCard from "../component/NewsCard";
import { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from "@mui/material";

const SearchPage = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <section id="search-page">
      <div className="text-center">
        <Typography variant="h4">
          {props.title} News
        </Typography>
      </div>
      {props.loading ?
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

export default SearchPage;
