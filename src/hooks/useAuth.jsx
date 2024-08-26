import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/slices/UserSlice";
import { auth } from "../firebase";

export default function useAuth() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const signIn = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
    };
      dispatch(setUser(userData));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth); // Use the correct signOut function from Firebase
      dispatch(setUser(null)); // Clear the user state in Redux after signing out
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signIn, signUp, signOut };
}
