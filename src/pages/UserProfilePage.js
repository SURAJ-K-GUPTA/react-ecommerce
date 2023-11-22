import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfie from "../features/user/components/UserProfile";

const UserProfilePage
 = () => {
  return (
    <div>
      <Navbar>
    <h1 className="mx-auto text-2xl">My Profile</h1>
      <UserProfie></UserProfie>
      </Navbar>
    </div>
  );
};

export default UserProfilePage
;
