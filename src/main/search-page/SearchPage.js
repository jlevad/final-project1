import React from 'react';

const SearchPage = ({ data }) => {
  return (
    <section id="search-page">
      <div className="grid grid-cols-auto-fit gap-x-4 gap-y-6 place-content-center">
        {data !== undefined ? (
          data.map((item, i) => (
            <div className="item_wrap" key={i}>
              <h2 className="text-sm font-normal">{item.source.name}</h2>
              <h1 className="font-bold text-lg">{item.title}</h1>
              <span className="text-sm">{item.author}</span>
              <p>{item.description}</p>
              <div className="btn_action mt-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-blue-600 text-white"
                >
                  Detail Page
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
