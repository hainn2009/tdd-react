export default function () {
    return (
        <div>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <label htmlFor="passwordRepeat">Password Repeat</label>
            <input type="password" id="passwordRepeat" />
            <button disabled>Sign Up</button>
        </div>
    );
}
