import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/ui/avatar';
import { Button } from '@/core/components/ui/button';
import { Heart, MessageCircle, MoreHorizontal, Music, Play, Send, Volume2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface InstagramReelProps {
  username?: string;
  userAvatar?: string;
  reelVideo?: string;
  likes?: number;
  comments?: number;
  caption?: string;
  musicTitle?: string;
  musicArtist?: string;
  isLiked?: boolean;
  verified?: boolean;
}

export function InstagramReel({
  username = "travel_creator",
  userAvatar = "https://images.unsplash.com/photo-1494790108755-2616b612b194?w=150&h=150&fit=crop&crop=face",
  reelVideo = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop",
  likes = 15400,
  comments = 284,
  caption = "Epic mountain sunrise hike! 🏔️ The early morning climb was totally worth it for this view. Who else loves chasing sunrises? #mountains #hiking #sunrise #adventure",
  musicTitle = "Epic Adventure",
  musicArtist = "Nature Sounds",
  isLiked = false,
  verified = false
}: InstagramReelProps) {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto aspect-9/17 bg-black rounded-lg overflow-hidden relative">
      
      {/* Video de fondo */}
      <video
        ref={videoRef}
        src={reelVideo}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
      />


      <div className="absolute top-0 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-medium">Reels</span>
        </div>
        <Button variant="ghost" size="sm" className="p-1 text-white hover:bg-white/20">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Overlay click para pausar/reproducir */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={togglePlay}
      />
    
      {/* Botón Play centrado */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center text-white"
            onClick={togglePlay}
          >
            <Play className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Right side action buttons */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center space-y-4 z-20">
        <div className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/20">
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </Button>
          <span className="text-white text-xs">{likes >= 1000 ? `${(likes/1000).toFixed(1)}K` : likes}</span>
        </div>

        <div className="flex flex-col items-center">
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/20">
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
          <span className="text-white text-xs">{comments}</span>
        </div>

        <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-white/20">
          <Send className="w-6 h-6 text-white"/>
        </Button>

        <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-white/20">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </Button>

        {/* Profile avatar at bottom of actions */}
        <div className="relative">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-13 left-0 right-16 p-4 z-20">
        {/* Profile info */}
        <div className="flex w-40 items-center space-x-2 mb-2">
          <span className="text-white text-sm leading-relaxed line-clamp-3 font-medium">@{username}</span>
          {verified && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
          <Button variant="outline" size="sm" className="h-6 px-3 text-xs border-white text-white bg-transparent hover:bg-white/20">
            Follow
          </Button>
        </div>

        {/* Caption */}
        <p className="text-white text-sm mb-1 leading-relaxed line-clamp-3">
          {caption}
        </p>

        {/* Music info */}
        <div className="flex items-center space-x-2 bg-black/30 rounded-full px-3 py-1 w-fit">
          <Music className="w-4 h-4 text-white" />
          <span className="text-white text-xs">
            {musicTitle} • {musicArtist}
          </span>
          <Volume2 className="w-4 h-4 text-white ml-2" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-0 right-0 h-1 bg-white/30 z-10">
        <div className="h-full bg-white w-1/3 transition-all duration-1000" />
      </div>
    </div>
  );
}

