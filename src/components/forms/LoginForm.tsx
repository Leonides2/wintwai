import { UserContext } from "@/context/UserContext";
import { login } from "@/lib/api/client";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    setLoginMode: (mode: boolean) => void;
    setRegisterMode: (mode: boolean) => void;
}

const LoginForm = ({setLoginMode, setRegisterMode}: Props) => {
    const { handleSubmit, register, reset} = useForm<{
        email: string,
        password: string
    }>()

    const userData = useContext(UserContext)

    if(!userData){
        return null;
    }

     const fetchData = async ({email, password}:{email: string, password: string}) => {
    
        try {
          const res = await login({ email: email, password: password});

          const parserRes =  res["user"]
          userData.setIsLogin(true);
          userData.setUser({
            email: parserRes["email"],
            history: parserRes["history"],
            nombre: parserRes["nombre"]
          });
          userData.setToken(res["token"]);
          
        } catch (error) {
          console.error("Error fetching data:", error);
          alert("Failed to login. Please try again.");
        }
    
    
      };

    const onSubmit: SubmitHandler<{
        email: string,
        password: string
    }> = (data) => {
        fetchData(data)
        reset()
    }
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="Email" className="border p-2 mb-4 w-full" {...register("email",{
                    required: true,
                    maxLength: 64
                })} />
                <input type="password" placeholder="Password" className="border p-2 mb-4 w-full" {...register("password",{
                    required: true,
                    minLength: 6,
                    maxLength: 18
                })}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
            </form>
            <p className="mt-4"> Don&apos;t have an account?
                <span className="text-blue-500 cursor-pointer" onClick={() => { setLoginMode(false); setRegisterMode(true); }}> Register</span>
            </p>
        </div>
    );
}

export default LoginForm;