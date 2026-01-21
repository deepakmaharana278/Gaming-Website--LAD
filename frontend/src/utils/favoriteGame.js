export const toggleFavoriteGame = async (uid, gameName) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/toggle-favorite-game/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, game_name: gameName }),
    }
  );

  return res.json();
};
