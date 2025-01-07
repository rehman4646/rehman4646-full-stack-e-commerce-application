import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate(); // define navigate


    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if (!user || !token) {
            navigate('/')
        }

        const GetProfile = async () => {
            let result = await fetch(`http://localhost:500/userProfie/${user._id}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProfile(result);
            } else {
                setError("Profile not found or error occurred");
                return
            }
        }
        GetProfile();
    }, []);



    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {error && <apan className="ProfileError">{error}</apan>}

            {profile ? (
                <div className="profile-details">
                    {profile.imgURL && (
                        <img src={`http://localhost:500${profile.imgURL}`} className="images" alt="Profile" />
                    )}
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>CNIC:</strong> {profile.CNIC}</p>
                    <p><strong>Gender:</strong> {profile.Gender}</p>
                    <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
                    <p><strong>Contact Number:</strong> {profile.contactNo}</p>

                </div>
            ) : (
                <p>Loading profile...</p>
            )}



        </div>

    )
}
export default UserProfile;