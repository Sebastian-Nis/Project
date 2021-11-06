import clsx from 'clsx';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './Auth.context';

export function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    type:'user',
    'retype-password': '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    'retype-password': '',
  });

  const [apiError, setApiError] = useState('');

  const { auth, login } = useAuth();

  const history = useHistory();
  const location = useLocation();

  

  if (auth) {
    history.push('/');
    return null;
  }

  let isLogin = false;
  if (location.pathname.includes('login')) {
    isLogin = true;
  }

  function handleChange(e) {
    const newValues = { ...values };
    newValues[e.target.name] = e.target.value;
    const newErrors = { ...errors };
    newErrors[e.target.name] = '';

    setValues(newValues);
    setErrors(newErrors);
    setApiError('');
    // setValues({ ...values, [e.target.name]: e.target.value });
    // setErrors({ ...errors, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const data = await fetch(
      `http://localhost:3001/${isLogin ? 'login' : 'register'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          type:values.type
        }),
      }
    ).then((res) => res.json());

    if (data.accessToken) {
      login(data);
      let to = '/';
      if (location.state?.from) {
        to = location.state.from.pathname + location.state.from.search;
      }
      history.push(to);
      return null;
    } else {
      setApiError(data);
    }
  }

  function isFormValid() {
    let isValid = true;
    let newErrors = { ...errors };

    if (!values.email) {
      isValid = false;
      newErrors.email = 'Please enter your email in order to register!';
    }

    if (!values.password) {
      isValid = false;
      newErrors.password = 'Please choose a password';
    }

    if (!isLogin && values.password !== values['retype-password']) {
      isValid = false;
      newErrors['retype-password'] = 'Your passwords did not match!';
    }

    setErrors(newErrors);
    return isValid;
  }

  
  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {apiError && (
        <div className="alert alert-danger" role="alert">
          {apiError}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          value={values.email}
          onChange={handleChange}
          className={clsx('form-control', { 'is-invalid': errors.email })}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={clsx('form-control', { 'is-invalid': errors.password })}
        />
        <div className="invalid-feedback">{errors.password}</div>
        {!isLogin && (
          <>
            <label htmlFor="retype-password" className="form-label">
              Retype Password
            </label>
            <input
              type="password"
              id="retype-password"
              name="retype-password"
              value={values['retype-password']}
              onChange={handleChange}
              className={clsx('form-control', {
                'is-invalid': errors['retype-password'],
              })}
            />
            <div className="invalid-feedback">{errors['retype-password']}</div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </div>
    </form>
  );
}