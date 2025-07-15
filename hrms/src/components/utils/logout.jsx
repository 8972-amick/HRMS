import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return(
        <button
        onClick={handleLogout}
        className="flex flex-end justify-center items-center p-2 text-sm cursor-pointer transition-all duration-500 text-black hover:text-white ring-1 ring-amber-800 border-amber-500 hover:bg-amber-800 rounded-2xl">
            Logout</button>
    )
}
