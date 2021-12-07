import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getIsLoggedIn } from '../redux/auth/auth-selectors';
import { getmoviesError } from '../redux/movie/movie-selectors';

import AuthForm from './AuthForm/AuthForm';
import Movies from './Movies/Movies';
import Container from './shared/Container/Container';
import Notifier from './shared/Notifier/Notifier';

function App() {
  const [showError, setShowError] = useState(false);

  const movieError = useSelector(getmoviesError);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!movieError) return;

    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 1000);
  }, [movieError]);

  return (
    <Container>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <Movies />}
      {showError && <Notifier message={movieError} />}
    </Container>
  );
}

export default App;
