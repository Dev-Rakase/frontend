import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginUserSchema } from "../schema/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../libs/utils"
import { useTransition } from "react"

export default function Login() {
    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [loading, startTransition] = useTransition()

    const formSubmit = (data: z.infer<typeof loginUserSchema>) => {
        startTransition(() => {

        })
    }



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
