export const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  isLogedIn,
  handleLogin,
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          required
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          required
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Log in</button>
      </form>
      {isLogedIn && <p>Log in successful! Welcome back, {email}!</p>}
    </>
  );
};
