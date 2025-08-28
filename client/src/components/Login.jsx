import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const EyeOpen = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.687 1.664-1.217 2.385M15.5 15.5l-1.5-1.5m-4.5 0l-1.5 1.5" />
  </svg>
);

const EyeClosed = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M6.1 6.1C4.07 7.94 2.46 10.36 2.46 12c0 1.64 1.61 4.06 3.64 5.9M17.9 17.9C19.93 16.06 21.54 13.64 21.54 12c0-1.64-1.61-4.06-3.64-5.9" />
  </svg>
);

const Login = () => {
    const {setShowUserLogin,setUser,axios,navigate}= useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [reconfirmPassword, setReconfirmPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showReconfirm, setShowReconfirm] = React.useState(false);

    const onSubmitHandler = async(event)=>{
        try{
           event.preventDefault();
           if(state === "register" && password !== reconfirmPassword){
               toast.error("Passwords do not match");
               return;
           }
           const{data}= await axios.post(`/api/user/${state}`,{
            name,email,password
           });
           if (data.success){
              navigate('/')
              setUser(data.user)
              setShowUserLogin(false)
           }else{
               toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
    <div onClick={()=> setShowUserLogin(false)} className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
        <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-[var(--color-primary)]">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[var(--color-primary)]" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[var(--color-primary)]" type="email" required />
            </div>
            <div className="w-full relative">
                <p>Password</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter Password"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-[var(--color-primary)]"
                    type={showPassword ? "text" : "password"}
                    required
                />
                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 cursor-pointer select-none"
                >
                    {showPassword ? EyeOpen : EyeClosed}
                </span>
            </div>
            {state === "register" && (
                <div className="w-full relative">
                    <p>Reconfirm Password</p>
                    <input
                        onChange={(e) => setReconfirmPassword(e.target.value)}
                        value={reconfirmPassword}
                        placeholder="Reconfirm Password"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-[var(--color-primary)]"
                        type={showReconfirm ? "text" : "password"}
                        required
                    />
                    <span
                        onClick={() => setShowReconfirm(!showReconfirm)}
                        className="absolute right-3 top-9 cursor-pointer select-none"
                    >
                        {showReconfirm ? EyeOpen : EyeClosed}
                    </span>
                </div>
            )}
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-[var(--color-primary)] cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-[var(--color-primary)] cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login
