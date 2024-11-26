import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginUserSchema } from "../schema/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../libs/utils"
import { useEffect, useTransition } from "react"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth"
import { auth } from "../libs/auth"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [loading, startTransition] = useTransition()


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate("/dashboard")
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const formSubmit = (data: z.infer<typeof loginUserSchema>) => {
        // can move action to redux async thunk if login and app is big
        startTransition(() => {
            createUserWithEmailAndPassword(auth, data.email, data.password).then(userCredential => {

                // call backend api to save user info
                console.log(userCredential)

                navigate("/dashboard")

            })

        })
    }


    // can use better component like shadcn-UI for FORM & Button
    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center ">
            <h4 className="text-xl font-bold">Login Form</h4>
            <div className="border w-[500px] p-8  text-center">
                <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">

                    <div>

                        <input {...register("email")} name="email" type="email" placeholder="Email Address"
                            className={cn("border px-2 py-2 rounded-xl w-full")} />
                        <p className="text-xs text-red-400 text-left">{errors.email?.message}</p>
                    </div>

                    <div>

                        <input type="password" placeholder="Password" className={cn("border px-2 py-2 rounded-xl w-full")} {...register("password")} />
                        <p className="text-xs text-red-400 text-left">{errors.password?.message}</p>
                    </div>

                    <button className={cn("border bg-teal-400 text-white px-6 py-2 rounded-lg")} disabled={loading}>{loading ? "Loading..." : "Login"}</button>
                </form>
            </div>
        </div>
    )
}
