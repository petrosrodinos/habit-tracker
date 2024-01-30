import React, { FC } from "react";
import Google from "../../components/Google";
import { signInWithGoogle } from "../../services/auth";
import { addNewUser } from "../../services/user";

const Auth: FC = () => {
  const handleGoogleSignIn = async () => {
    try {
      signInWithGoogle().then(async (res) => {
        handleLogin(res.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (user: any) => {
    try {
      const loggedUser = await addNewUser(user);
      if (loggedUser) {
        console.log("loggedUser", loggedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Google onClick={handleGoogleSignIn} />
    </div>
  );
};

export default Auth;
