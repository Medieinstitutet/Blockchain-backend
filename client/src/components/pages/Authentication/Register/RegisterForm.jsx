export const RegisterForm = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleRegister
}) => {
  return (
    <>
      <form onSubmit={handleRegister}>
        <h3>Registration</h3>
        <input
          required
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        <button type='submit'>Register</button>
      </form>
    </>
  );
};
