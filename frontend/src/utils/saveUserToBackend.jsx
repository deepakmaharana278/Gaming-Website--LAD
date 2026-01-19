export const saveUserToBackend = async (firebaseUser, username = "") => {
  if (!firebaseUser) return;

  await fetch(`${import.meta.env.VITE_API_URL}/api/save-user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: firebaseUser.uid,
      name: username || firebaseUser.displayName || "Player",
      email: firebaseUser.email,
      photo: firebaseUser.photoURL || "",
    }),
  });

  // store uid for dashboard usage
  localStorage.setItem("uid", firebaseUser.uid);
};
