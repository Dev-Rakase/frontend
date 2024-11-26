import { Link } from "react-router-dom";

export default function ErrorComponent() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
            <h2 className="text-5xl">Oops, Error</h2>
            <Link to="/">Home</Link>
        </div>
    )
}
