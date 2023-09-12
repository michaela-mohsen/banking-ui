import { NavLink, Outlet } from "react-router-dom";

const Profile: React.FC = () => {
    return <div className="columns">
        <div className="column col-4">
            <ul className="nav">
                <li className="nav-item"><NavLink className={({ isActive }) => isActive ? "btn btn-link active" : "btn btn-link"} to={"/profile/home"}>Profile</NavLink></li>
                <li className="nav-item"><NavLink className={({ isActive }) => isActive ? "btn btn-link active" : "btn btn-link"} to={"/profile/update"}>Update my information</NavLink></li>
            </ul>
        </div>
        <div className="column col-8">
            <Outlet />
        </div>
    </div>
};
export default Profile;