import { useRef, useEffect } from 'react';
import { useLoaderData, Form, redirect, useNavigation, useActionData } from 'react-router-dom';

import {loginUser} from '../service/api';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  
  try {
    await loginUser({ email, password });
    localStorage.setItem('loggedin', true);
    return redirect('/host');
  } catch (err) {
		console.error(err);
    return err.message;
  }
}

const Login = () => {
  const message = useLoaderData();
  const navigation = useNavigation();
	const errorMessage = useActionData();
  const formRef = useRef();

	useEffect(() => {
    if (navigation.state === 'idle') {
      // Reset the form inputs after submission
      formRef.current.reset();
    }
  }, [navigation.state]);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus('submitting');
  //   loginUser(loginFormData)
  //     .then((data) => {
  //       navigate("/host", {replace: true});
  //       setLoginFormData({email: '', password: ''});
  //     })
  //     .catch((err) => console.error(err))
  //     .finally(() => setStatus('idle'));
  // }

  return (
    <div className="login-container">
			{message && <h2 style={{color: 'red'}}>{message}</h2>}
      {errorMessage && <h2 style={{color: 'red'}}>{errorMessage}</h2>}

      <h1>Sign in to your account</h1>
      <Form method="post" className="login-form" ref={formRef} replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button>Log in</button>
      </Form>
    </div>
  );
};

export default Login;
