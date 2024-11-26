import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerUserSchema } from "../schema/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../libs/utils"
import { useEffect, useTransition } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../libs/auth"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",

        }
    });
    const [loading, startTransition] = useTransition()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate("/dashboard")
            }
        });

        return () => unsubscribe();
    }, [navigate]);


    const formSubmit = (data: z.infer<typeof registerUserSchema>) => {
        // can move action to redux async thunk if login and app is big
        startTransition(() => {
            createUserWithEmailAndPassword(auth, data.email, data.password).then(userCredential => {

                // call backend api to save user info
                console.log(userCredential)


            }).catch(err => {
                alert(err.message)
            })

        })
    }


    // can use better component like shadcn-UI for FORM & Button
    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center ">
            <h4 className="text-xl font-bold">Register Form</h4>
            <div className="border w-[500px] p-8  text-center">
                <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">

                    <div>

                        <input {...register("name")} name="name" type="text" placeholder="Your Name"
                            className={cn("border px-2 py-2 rounded-xl w-full")} />
                        <p className="text-xs text-red-400 text-left">{errors.name?.message}</p>
                    </div>

                    <div>

                        <input {...register("email")} name="email" type="email" placeholder="Email Address"
                            className={cn("border px-2 py-2 rounded-xl w-full")} />
                        <p className="text-xs text-red-400 text-left">{errors.email?.message}</p>
                    </div>

                    <div>

                        <input type="password" placeholder="Password" className={cn("border px-2 py-2 rounded-xl w-full")} {...register("password")} />
                        <p className="text-xs text-red-400 text-left">{errors.password?.message}</p>
                    </div>

                    <button className={cn("border bg-teal-400 text-white px-6 py-2 rounded-lg")} disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
                    <Link to="/" className="mt-4 block mx-auto text-sm underline w-max">Login Here</Link>
                </form>
            </div>
        </div>
    )
}
