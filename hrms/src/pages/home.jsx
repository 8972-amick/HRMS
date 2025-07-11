import Sidebar from "../components/home/sidebar";
import Topbar from "../components/home/topbar";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <Topbar/>
            <div className="flex flex-1 overflow-hidden">
                <div>
                <Sidebar />

            </div>
            <div className="flex-1 overflow-y-auto p-5">
                <Outlet />
                
            </div>
        </div>
    </div>
    );
}