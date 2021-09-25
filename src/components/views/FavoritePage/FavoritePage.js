import React, { useEffect, useState } from 'react';
import { Typography, Popover, Button } from 'antd';
import axios from 'axios';
import './favorite.css';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../Config';
import SingleComment from '../MovieDetail/Sections/SingleComment';

const { Title } = Typography;

function FavoritePage() {
  const user = useSelector((state) => state.user);
  const [Movie, setMovie] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  let variable = { userFrom: localStorage.getItem('userId') };

  useEffect(() => {
    fetchFavoredMovie();
  }, []);
  const fetchFavoredMovie = async () => {
    await axios
      .post('/api/favorite/getFavoredMovie', variable)
      .then(async (response) => {
        if (response.data.success) {
          const movieIds = response.data.favorites.map((item) => item.movieId);
          const commentsArray = await Promise.all(
            movieIds.map(async (movieId) => {
              const movieVariable = {
                movieId: movieId,
              };
              return axios
                .post('/api/comment/getComments', movieVariable)
                .then((response) => {
                  if (response.data.success) {
                    return response.data.comments;
                  } else {
                    alert('Failed to get comments Info');
                  }
                });
            })
          );
          setFavorites(response.data.favorites);
          setCommentLists(commentsArray);
          setLoading(false);
        } else {
          alert('Failed to get subscription videos');
        }
      });
  };

  // useEffect(() => {
  //   fetchComments();
  // }, []);
  // const fetchComments = () => {
  //   axios.post('/api/comment/getComments', variable).then((response) => {
  //     // if (response.data.success) {
  //     if (response) {
  //       // setComments(response);
  //       // setLoading(false);
  //     } else {
  //       alert('Failed to get comments');
  //     }
  //   });
  // };

  const onClickDelete = async (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    try {
      const response = await axios.post(
        '/api/favorite/removeFromFavorite',
        variables
      );
      if (response.data.success) await fetchFavoredMovie();
    } catch (err) {
      console.log(err);
      alert('Failed to Remove From Favorite');
    }
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`}
            alt="movie-poster"
          />
        ) : (
          'no image'
        )}
        <div>
          {}
          {CommentLists.length !== 0 &&
            CommentLists[index].map((comment) => {
              if (comment) {
                return <SingleComment comment={comment} />;
              } else return null;
            })}
        </div>
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            {' '}
            Remove{' '}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}> Favorites </Title>
      <hr />
      {user.userData && !user.userData.isAuth ? (
        <div
          style={{
            width: '100%',
            fontSize: '2rem',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>Please Log in first...</p>
          <a href="/login">Go to Login page</a>
        </div>
      ) : (
        !Loading && (
          <table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites</td>
              </tr>
            </thead>
            <tbody>{renderCards}</tbody>
          </table>
        )
      )}
    </div>
  );
}

export default FavoritePage;
