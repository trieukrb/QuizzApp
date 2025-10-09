import React, {useState} from 'react';

const Login = () => {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({emailValue, passwordValue})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="email">
                    <label>Email</label>
                    <input type="email" id="email" placeholder='Email'
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value) }

                    />
                </div>
                <div className="password">
                    <label>Password</label>
                    <input type="password" id="password" placeholder='Password'
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value) }
                    />
                </div>
                <button type='submit'>Dang Nhap</button>
            </form>
        </div>
    );
};

export default Login;