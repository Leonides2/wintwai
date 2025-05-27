import { useContext, useState } from "react";
import ButtonGeneric from "../atoms/ButtonGeneric";
import LoginForm from "../forms/LoginForm";
import { disableDialogs, enableDialogs } from "@/lib/dialogs";
import RegisterForm from "../forms/RegisterForm";
import { UserContext } from "@/context/UserContext";


const ProfileBundle = () => {
    const [registerMode, setRegisterMode] = useState<boolean>(false)
    const [loginMode, setLoginMode] = useState<boolean>(true)

    const userData = useContext(UserContext)
    
        if(!userData){
            return;
        }

    return (
        <>
            <div className="fixed top-0 right-0 size-16 bg-white border-1 p-2  m-3 
                rounded-lg shadow-lg flex items-center justify-center"
                onClick={() => enableDialogs()
                }
            >
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    </path><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#000000" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>
            <dialog open={false} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg
                max-w-md w-full  flex-col gap-4">

                <ButtonGeneric callback={() => disableDialogs()}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M6 18L18 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </ButtonGeneric>
                
                {
                    !userData.isLogin ?
                        loginMode ? (
                            <LoginForm setLoginMode={setLoginMode} setRegisterMode={setRegisterMode}/>
                        ) : registerMode ? (
                            <RegisterForm setLoginMode={setLoginMode} setRegisterMode={setRegisterMode}/>
                        ) : null
                    :
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-full p-2 bg-[#F0F0F0] rounded-lg">
                            <h3>Username: </h3>
                            <p>{userData.user.nombre}</p>
                        </div>
                        <div className="w-full p-2 bg-[#F0F0F0] rounded-lg">
                        <h3>Email: </h3>
                        <p>{userData.user.email}</p>
                        </div>
                        <ButtonGeneric callback={() => {
                            userData.setIsLogin(false);
                            userData.setUser({
                                email: "",
                                history: [],
                                nombre: ""
                            })

                        }}>
                            Logout
                        </ButtonGeneric>
                    </div>

                }
            </dialog>
        </>
    );
}

export default ProfileBundle;