import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const User = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userDetail = localStorage.getItem("user");
        if (userDetail) {
            const userData = JSON.parse(userDetail);
            setUser(userData);
        }
    }, []);

    return (
        <div className="User">
            <h1>User Details</h1>
            <ul>
                <li className="heading">User Name</li>
                <li className="heading">User Email</li>
                <li className="heading">Profile</li>
                <li className="heading">Update Profile</li>
            </ul>
            {user ? (
                <ul>
                    <li>
                        {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : "No Name"}
                    </li>
                    <li>{user.email ? user.email : "No Email"}</li>
                    <li><Link to="/userProfile/:userId">Profile</Link></li>
                    <li><Link to={`/profile/${user._id}`}>Update Profile</Link></li>
                </ul>
            ) : (
                <p>No user details available. Please log in.</p>
            )}
        </div>
    );
};

export default User;
