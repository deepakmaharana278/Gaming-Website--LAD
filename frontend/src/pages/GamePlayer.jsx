import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GamePlayer() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/`)
      .then((res) => res.json())
      .then((data) => setGame(data[id]));
  }, [id]);

  if (!game) return <h2 className="text-white p-6">Loading...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-3">{game.title}</h1>

      <div className="bg-black rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={game.url}
          width="100%"
          height="600"
          allowFullScreen
          className="w-full"
        ></iframe>
      </div>

      <p className="text-gray-300 mt-4">{game.description}</p>
    </div>
  );
}
