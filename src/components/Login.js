
 const LoginForm = ({ handleUsernameChange, handlePasswordChange, handleLogin, username, password, }) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => handleUsernameChange(target)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => handlePasswordChange(target)}
          />
        </div>
        <button type='submit'>Log In</button>
      </form>
      {/* <button onClick={hideLogin}>Cancel</button> */}
    </div>
  );
};

export default LoginForm