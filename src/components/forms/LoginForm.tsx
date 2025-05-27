
interface Props {
    setLoginMode: (mode: boolean) => void;
    setRegisterMode: (mode: boolean) => void;
}

const LoginForm = ({setLoginMode, setRegisterMode}: Props) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="w-full max-w-sm">
                <input type="email" placeholder="Email" className="border p-2 mb-4 w-full" />
                <input type="password" placeholder="Password" className="border p-2 mb-4 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
            </form>
            <p className="mt-4">Don't have an account?
                <span className="text-blue-500 cursor-pointer" onClick={() => { setLoginMode(false); setRegisterMode(true); }}> Register</span>
            </p>
        </div>
    );
}

export default LoginForm;