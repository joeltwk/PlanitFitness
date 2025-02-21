import { useEffect, useState } from 'react';

import { login } from '../services/UserService';

function LoginBlock({userValues, setUserValues, loggedIn, setLoggedIn}) {
    
    const onChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value});
    };

    const [loginError, setLoginError] = useState({
        loginError: false
    });

    const changeLoginError = (valid) => {
        setLoginError({loginError: valid})
    }

    const setToLoggedIn = () => {
        setLoggedIn({loggedIn: true})
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const response = await login(userValues);
        //   loggedIn.loggedIn = true;
        setToLoggedIn();
          console.log(response);
        }
        catch(error) {
          console.log(error.response.data)
          console.log("login fail")
          changeLoginError(true);
        }
      };

      const setLoginErrorDefault = () => {
        setLoginError(false);
      }

      useEffect(() => {
        setLoginErrorDefault();
      }, [])

    return (
        <div className="loginContainer">
            <form onSubmit={handleLogin}>
                <div className="loginForm">
                    <div className="input_box">
                        <span className="details">Username:</span>
                        <input type="text" className='loginError' value={userValues.username} onChange={onChange} name="username" required />
                    </div>
                    <div className="input_box">
                        <span className="details">Password:</span>
                        <input type="password" value={userValues.password} onChange={onChange} name="password" required />
                    </div>
                    <div className={loginError ? 'loginErrorText' : 'loginErrorText loginErrorInactive'}>
                        <p>Incorrect Username or Password</p>
                    </div>
                    <div className="form_footer">
                        <button type="button" className="cancel-btn">Register</button>
                        <button type="submit" className="save-btn">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginBlock;