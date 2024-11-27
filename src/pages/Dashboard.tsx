import { signOut } from "firebase/auth";
import { auth } from "../libs/auth";
import { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchUserAction } from "../redux/actions/userAction";
import API from "../libs/config";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";



export default function Dashboard() {
    const { loading, error, data } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()

    const [bio, setBio] = useState(data?.bio || '')
    const [pending, startTransition] = useTransition();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchUserAction())
    }, [dispatch])

    const handleLogout = async () => {
        // no need redirect due to auth context
        await signOut(auth);
    }

    const updateBio = () => {
        startTransition(() => {
            API.put("/user", { bio }).then(() => {
                toast.success("Bio Updated");
                navigate(location.pathname, { replace: true }) // soft reload
            }).catch(e => {
                toast.error(e.message)
            })
        })
    }


    if (loading) {
        return <p>Loading....</p>
    }

    if (error) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <p>Error on fetching profile</p>
            </div>
        )
    }

    return (
        <div className='w-full h-full container mx-auto mt-8 space-y-3'>
            <div className="flex justify-between items-center ">
                <h3 className="text-4xl">You are login as: <span className="text-red-500">{data?.name}</span></h3>
                <button onClick={handleLogout} className="border px-4 py-2 bg-red-400 text-white rounded-md">Logout</button>
            </div>
            <h6>{data?.email}</h6>

            <textarea onChange={e => setBio(e.target.value)} value={bio} name="bio" className="border w-full p-4" rows={15} placeholder="Update your BIO"></textarea>
            <button disabled={pending} onClick={updateBio} className="border px-4 py-2 bg-green-400 text-white rounded-md">Save</button>
        </div>
    )
}
