import {useState} from 'react';
import {useLoaderData} from 'react-router-dom';

import {loginUser} from '../service/api';

export function loader({request}) {
  return new URL(request.url).searchParams.get('message');
}

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({email: '', password: ''});
  const [status, setStatus] = useState('idle');
  const message = useLoaderData();

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    loginUser(loginFormData)
      .then((data) => {
        console.log(data);
        setLoginFormData({email: '', password: ''});
      })
      .catch((err) => console.error(err))
      .finally(() => setStatus('idle'));
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {message && <h2 style={{color: 'red'}}>{message}</h2>}
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === 'submiting'}>
          {status === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
};

export default Login;
