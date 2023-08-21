import AuthService from "../services/AuthService";

const Profile: React.FC = () => {
    const currentUser = AuthService.getCurrentUser();
    return <div>Here's where the user will be when this works! Email: {currentUser.email} token: {currentUser.token}</div>
};
export default Profile;