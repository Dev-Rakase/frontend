import { signOut } from "firebase/auth";
import { useAuth } from "../context/ProtectedRouteContext";
import { auth } from "../libs/auth";

export default function Dashboard() {
    const user = useAuth();


    const handleLogout = async () => {
        await signOut(auth);
        // no need redirect due to auth context
    }

    return (
        <div className='w-full h-full container mx-auto mt-8 space-y-3'>
            <div className="flex justify-between items-center ">
                <h3 className="text-4xl">You are login as: </h3>
                <button onClick={handleLogout} className="border px-4 py-2 bg-red-400 text-white rounded-md">Logout</button>
            </div>
            <h6>{user?.email}</h6>
            <form >
                <textarea name="bio" className="border w-full p-4" rows={15} placeholder="Update your BIO"></textarea>
            </form>
            {/* <h6>{user?.bio}</h6> */}
        </div>
    )
}
