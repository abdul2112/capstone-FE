import React, { useState, useRef, useEffect } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  //   IMAGE_SIZE,
  PACEHOLDER_POSTER_SIZE,
  POSTER_SIZE,
} from "../../Config";
// import { Row } from 'react-bootstrap';
import { Typography, Row } from "antd";
import GridCard from "../../commons/GridCards";

const { Title } = Typography;

function Searchmovie() {
  const buttonRef = useRef(null);
  const [search, setSearch] = useState("avengers");
  const [result, setResult] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setResult([]);
    const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}`;
    if (search !== "") {
      fetchMovies(endpoint);
    }
  }, [search]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setResult(data.results);
      setCurrentPage(data.page);
      setLoading(false);
    } catch (e) {
      console.error();
    }
  };

  const getNextPage = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setResult([...result, ...data.results]);
      setCurrentPage(data.page);
      setLoading(false);
    } catch (e) {
      console.error();
    }
  };

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      // loadMoreItems()
      buttonRef.current.click();
    }
  };

  const handleChange = (e) => {
    setSearch(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1`;
    // if (search !== '') {
    //   fetchMovies(endpoint);
    // }
  };

  const loadMoreItems = () => {
    let endpoint = "";
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${
      CurrentPage + 1
    }`;
    getNextPage(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "wrap",
          paddingTop: "56px",
        }}
      >
        <input onChange={handleChange} type="search" />
      </form>

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}> Results</Title>
        <hr />
        {/* <Row> */}
        <Row gutter={[16, 16]}>
          {result.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCard
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : `https://via.placeholder.com/${PACEHOLDER_POSTER_SIZE}`
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            </React.Fragment>
          ))}
        </Row>

        {Loading && <div>Loading...</div>}

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchmovie;
