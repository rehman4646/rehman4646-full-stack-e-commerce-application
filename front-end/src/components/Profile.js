import React from "react";
import { useNavigate } from "react-router-dom";


const Profile=()=>{
    const [firstName,setFirstName]=React.useState('');
    const [lastName , setLastName]=React.useState('');
    const [CNIC , setCNIC]= React.useState('');
    const [Gender , setGender]= React.useState('');
    const [dateOfBirth , setdateOfBirth]= React.useState('');
    const [contactNo, setcontactNo]= React.useState('');
    const [imgURL , setimgURL]= React.useState(null);
    const [err, setError] = React.useState(false); // field empty error
    const [cnicError , setcnicError] = React.useState(false);
    const usenavigate = useNavigate();

        const addProfile=async (e)=>{
            e.preventDefault();
            console.log(firstName , lastName , CNIC , Gender , dateOfBirth , contactNo , imgURL);

            if(!firstName || !lastName || !CNIC || !Gender || ! dateOfBirth || !contactNo || !imgURL){
                setError(true);
                return false;
            }
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('CNIC', CNIC);
            formData.append('Gender', Gender);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('contactNo', contactNo);
            formData.append('imgURL', imgURL);

            const userId = JSON.parse(localStorage.getItem('user'))?._id;

            if (!userId) {
              console.log("User ID is not available");
              return;
            }
            let result =await fetch(`http://localhost:500/profile/${userId}`,{
                method: 'put',
                body: formData,
                headers : {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
               
            })
            result =await result.json();
            console.log("Json Result is : ", result);
            if(result.message === "Your CNIC is already registered.."){
                setcnicError("Your CNIC is alrady Registered....");
            } else {
                usenavigate('/userProfile/:userId')
            }
        }

    return (
        <div className="container">
            <h1>Create Profile</h1>
            <form onSubmit={addProfile} method="POST" encType="multipart/form-data">
            {/* enctype="" its mean multiple type of data upload krna chahty hain hum */}
                <label htmlFor="firstName">First Name :  </label>
                <input type="text" placeholder="Please Enter Fisrt Name " name="firstName" className="input"
                onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
                { err && !firstName && <span className="invalid-input-form">Please Enter Valid First Name</span>}

                <label htmlFor="lastName">Last Name :</label>
                <input type="text" placeholder="Please Enter Last Name " name="lastName" className="input"
                onChange={(e)=>setLastName(e.target.value)} value={lastName} />
                { err && !lastName && <span className="invalid-input-form">Please Enter Valid Last Name</span>}

                <label htmlFor="CNIC">CNIC :  </label>
                <input type="text" placeholder="Please Enter CNIC" name="CNIC" className="input"
                onChange={(e)=>setCNIC(e.target.value)} value={CNIC} />
                { err && !CNIC && <span className="invalid-input-form">Please Enter Valid CNIC</span>}
                {cnicError && <span className="invalid-input">{cnicError}</span>}


                <label htmlFor="gender">Gender :  </label>
                <input type="radio" name="gender" className="input"
                onChange={(e)=>setGender('Male')} /> Male
                <input type="radio" name="gender" className="input"
                onChange={(e)=>setGender('FeMale')}/> FeMale
                <input type="radio" name="gender" className="input" 
                onChange={(e)=>setGender('Other')}/> Other
                { err && !Gender && <span className="invalid-input-form">Please Enter Your Gender</span>}



                <label htmlFor="dateOfBirth">Date of Birth :  </label>
                <input type="text" placeholder="Please Enter DOB" name="dateOfBirth" className="input"
                onChange={(e)=>setdateOfBirth(e.target.value)} value={dateOfBirth}/>
                { err && !dateOfBirth && <span className="invalid-input-form">Please Enter Your DOB</span>}

                <label htmlFor="contactNo"> Phone No : </label>
                <input type="text" placeholder="Enter Phone No" name="contactNo" className="input"
                onChange={(e)=>setcontactNo(e.target.value)} value={contactNo} />
                { err && !contactNo && <span className="invalid-input-form">Please Enter Yor Contact No</span>}

                <label htmlFor="imgURL">Upload Img :  </label>
                <input type="file" placeholder="Choose img" name="imgURL" className="inputImg"
                onChange={(e)=>setimgURL(e.target.files[0])} />
                { err && !imgURL && <span className="invalid-input-form">Please Upload Your Image</span>}

                <button type="submit" className="button">Submit</button>

                


            </form>
        </div>
    )
}
export default Profile;