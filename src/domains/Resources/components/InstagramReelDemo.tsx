import { InstagramReel } from './InstagramReel';

export function InstagramReelDemo() {
  const reels = [
    {
      username: "iglesia__adventista__norte",
      userAvatar: "/logo.jpg",
      reelVideo: "/reel.mp4",
      likes: 24,
      comments: 1,
      caption: "🩷Así fue el resumen del impacto de salud sobre la concientización del cáncer de seno, como prevenirlo, prácticas saludables y recomendaciones para mejora el estado de salud. ✨",
      musicTitle: "Musica Original",
      musicArtist: "",
      isLiked: true,
      isPlaying: false,
      verified: false
    }
  ];

  return (
    <div className="h-full w-full justify-items-center">
      {reels.map((reel, index) => (
        <InstagramReel key={index} {...reel} />
      ))}
    </div>
  );
}

