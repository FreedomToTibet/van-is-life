import {useState} from 'react';
import {useLoaderData} from 'react-router-dom';

export function loader({request}) {
  return new URL(request.url).searchParams.get('message');
}

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({email: '', password: ''});
  const message = useLoaderData();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
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
      {message && <h2 style={{color: "red"}}>{message}</h2>}
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
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
