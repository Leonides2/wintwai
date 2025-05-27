import { UserContext } from "@/context/UserContext";
import { register } from "@/lib/api/client";
import { Usuario } from "@/lib/models/Usuario";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";



interface Props {
    setLoginMode: (mode: boolean) => void;
    setRegisterMode: (mode: boolean) => void;
}

const RegisterForm = ({ setLoginMode, setRegisterMode }: Props) => {
    const { handleSubmit, register: reg, reset } = useForm<Usuario>();

    const userData = useContext(UserContext)

    if (!userData) {
        return;
    }

    const fetchData = async (data: Usuario) => {

        try {
            const res = await register({ email: data.email, password: data.password, nombre: data.nombre });
            console.log(res)
            userData.setIsLogin(true);
            userData.setUser({
                email: res["email"],
                history: res["history"],
                nombre: res["nombre"]
            })
            

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to login. Please try again.");
        }


    };

    const onSubmit: SubmitHandler<Usuario> = (data) => {
        fetchData({
            email: data.email,
            nombre: data.nombre,
            password: data.password,
            history: []
        })
        reset()
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Username" className="border p-2 mb-4 w-full" {...reg("nombre",
                        {
                            required: true,
                            maxLength: 16
                        }
                    )} />
                    <input type="email" placeholder="Email" className="border p-2 mb-4 w-full" {...reg("email", {
                        required: true,
                        maxLength: 64
                    })} />
                    <input type="password" placeholder="Password" className="border p-2 mb-4 w-full" {...reg("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 18
                    })}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
                </form>
                <p className="mt-4"> Already have an account?
                    <span className="text-blue-500 cursor-pointer" onClick={() => { setLoginMode(true); setRegisterMode(false); }}> Login</span>
                </p>
            </div>
        </>
    );
}

export default RegisterForm;