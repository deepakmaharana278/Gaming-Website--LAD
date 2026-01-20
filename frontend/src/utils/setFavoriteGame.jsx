export const setFavoriteGame = async (uid, gameName = null) => {
  await fetch(`${import.meta.env.VITE_API_URL}/api/set-favorite-game/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: uid,
      game_name: gameName, 
    }),
  });
};
