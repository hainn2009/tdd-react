import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/profile.svg";

export type User = {
    id: number;
    username: string;
    email: string;
};

const UserListItem: React.FC<{ user: User }> = ({ user: { id, username } }) => {
    const navigate = useNavigate();
    return (
        <li className="list-group-item list-group-item-action" style={{ cursor: "pointer" }} onClick={() => navigate(`/user/${id}`)}>
            <img src={defaultProfileImage} alt="profile" width={30} className="rounded-circle shadow-sm" />
            {username}
        </li>
    );
};

export default UserListItem;
