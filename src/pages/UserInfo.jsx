import React from "react";
import { useParams } from "react-router-dom";

const UserInfo = () => {
  const { handle } = useParams();

  return (
    <div>
      <h1>User Info Page</h1>
      <p>Showing info for user handle: <strong>{handle}</strong></p>
      {/* You can fetch & show CF user info based on `handle` */}
    </div>
  );
};

export default UserInfo;
