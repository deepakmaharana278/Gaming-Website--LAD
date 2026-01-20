import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { saveUserToBackend } from "./saveUserToBackend";

export const googleLogin = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    // store uid
    localStorage.setItem("uid", firebaseUser.uid);

    // sync with backend
    await saveUserToBackend(firebaseUser);

    navigate("/all-games");
  } catch (error) {
    console.error("Google login failed:", error);
  }
};
