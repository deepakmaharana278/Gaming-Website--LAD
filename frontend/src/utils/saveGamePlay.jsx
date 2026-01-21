export const saveGamePlay = async (uid, gameName, playDuration) => {
  await fetch(`${import.meta.env.VITE_API_URL}/api/save-game-play/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: uid,
      game_name: gameName,
      play_duration: playDuration, 
    }),
  });
};
