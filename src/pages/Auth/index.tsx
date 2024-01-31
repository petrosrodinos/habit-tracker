import React, { FC } from "react";
import Google from "../../components/Google";
import { signInWithGoogle } from "../../services/auth";
import { addNewUser } from "../../services/user";
import { authStore } from "../../store/auth";
import { useHistory } from "react-router";

const Auth: FC = () => {
  const location = useHistory();
  const { logIn } = authStore();
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
      logIn(loggedUser);
      location.push("/todo");
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
