export default function Login() {
  return (
    <section>
      <h2>Staff sign in</h2>
      <form className="form" method="post" action="/api/auth/login">
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </label>
        <button>Sign in</button>
      </form>
    </section>
  );
}
