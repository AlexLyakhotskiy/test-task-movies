import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signUp, signIn } from '../../redux/auth/auth-operations';
import { resetError, resetAllError } from '../../redux/auth/auth-slice';
import { getAuthError } from '../../redux/auth/auth-selectors';

import Input from '../shared/Input/Input';
import MainButton from '../shared/MainButton/MainButton';

import styles from './AuthForm.module.css';
import {
  checkForSpaces,
  checkForSpecialCharacters,
} from '../../utils/functions';

const initialValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

export default function AuthForm() {
  const [userData, setUserData] = useState(initialValues);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState(initialValues);

  const inputErrors = useSelector(getAuthError);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const hasError = Object.values(errors).some(e => e);
    if (hasError) return;

    const operation = isSignUp ? signUp : signIn;
    dispatch(operation(userData));
  };

  const handleChangeInput = e => {
    const { name, value } = e.target;

    setErrors(prev => ({ ...prev, [name]: '' }));

    checkForSpaces(name, value, setErrors);

    if (name === 'name') {
      checkForSpecialCharacters(name, value, setErrors);
    }

    setUserData(prev => ({ ...prev, [name]: value }));

    const isErrorExist = inputErrors[name];
    if (isErrorExist) {
      dispatch(resetError(name));
    }
  };

  const handleChangeTypeForm = () => {
    setIsSignUp(p => !p);
    setUserData(initialValues);
    setErrors(initialValues);
    dispatch(resetAllError());
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.formTitle}>
          {isSignUp ? 'Registration' : 'Authentication'}
        </h2>
        <Input
          name="email"
          label="E-mail"
          value={userData.email}
          error={errors.email || inputErrors.email}
          onChange={handleChangeInput}
          className={styles.input}
        />
        {isSignUp && (
          <Input
            name="name"
            label="Name"
            value={userData.name}
            error={errors.name || inputErrors.name}
            onChange={handleChangeInput}
            className={styles.input}
          />
        )}
        <Input
          name="password"
          label="Password"
          value={userData.password}
          error={errors.password || inputErrors.password}
          onChange={handleChangeInput}
          className={styles.input}
          type="password"
        />
        {isSignUp && (
          <Input
            name="confirmPassword"
            label="Confirm password"
            value={userData.confirmPassword}
            error={errors.confirmPassword || inputErrors.confirmPassword}
            onChange={handleChangeInput}
            className={styles.input}
            type="password"
          />
        )}
        <div className={styles.btnWrapper}>
          <MainButton
            className={styles.btn}
            type="submit"
            label={isSignUp ? 'sign up' : 'sign in'}
          />
          <MainButton
            className={styles.btn}
            isMainButton={false}
            onClick={handleChangeTypeForm}
            label={isSignUp ? 'sign in' : 'sign up'}
          />
        </div>
      </form>
    </div>
  );
}
