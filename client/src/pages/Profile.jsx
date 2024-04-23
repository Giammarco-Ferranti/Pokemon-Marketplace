import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col w-full justify-start items-center mt-10">
      <div>Hello, username</div>
      <div>
        <ul>
          <li>Orders</li>
          <li>Listings</li>
          <li>Billing</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
