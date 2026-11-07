import { Button } from '@/core/components/ui/button';
import { Grid3X3, Heart, MessageCircle, Play, User } from 'lucide-react';
import { INSTAGRAM_HIGHLIGHTS, INSTAGRAM_PROFILE_DATA, RESOURCES_MEDIA } from '../constants/resourcesConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  comments?: number;
  isVideo: boolean;
}

interface InstagramProfileProps {
  width?: number;
  height?: number;
}

/**
 * Posts de Instagram de la iglesia
 * TODO: Mover a API o servicio cuando esté disponible
 */
const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 1,
    image: "https://scontent.cdninstagram.com/v/t51.71878-15/563114856_1167509138623605_5120470350048738597_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ig_cache_key=Mzc0MDMxMjc3MzIxODYwNzY3MQ%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHg4NDYuc2RyLkMzIn0%3D&_nc_ohc=9WdfkkVAF_cQ7kNvwGkexIm&_nc_oc=AdlbSk1WPG0mqbWOeutrOPK5dnatDGlw0IvDhhkstsjaJh3VUdRqNeaE2sKeEBLU1-g&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=O7uvVzrwlaUiTtQ3oKT-cA&oh=00_Affy_aLleTS0felj3FdTD-ZzkPjwTsRSKZETQV7D72KLOQ&oe=68F4F758",
    comments: 0,
    likes: 15,
    isVideo: true,
  },
  {
    id: 2,
    image: "https://scontent.cdninstagram.com/v/t51.82787-15/563662068_18081140201316908_3407603246004298924_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=104&ig_cache_key=MzczOTY4MTcxNzc5MjY1Njc3MDE4MDgxMTQwMTk1MzE2OTA4.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjIyNjh4NDAzMi5zZHIuQzMifQ%3D%3D&_nc_ohc=oNDMZBmtoP8Q7kNvwEDsdFQ&_nc_oc=Adn9QKfuhO7wR8nJK0IVUzRng9kMrbeLvkdJdMoTQ_y_RPEhkWVIZaQE-s8_a1LRCkk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=O7uvVzrwlaUiTtQ3oKT-cA&oh=00_AfdRcPB1kh3L83uDd6DWs2w9oC0JZsjU7hdxuwnjlXorqQ&oe=68F4E116",
    comments: 0,
    likes: 21,
    isVideo: true,
  },
  {
    id: 3,
    image: "https://scontent.cdninstagram.com/v/t51.82787-15/559530709_18080170832316908_4592242899773314200_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzczNDUzMzcwNTUzMzU4NDM1MA%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjg2NHgxMDgwLnNkci5DMyJ9&_nc_ohc=2zOG5r0OYWQQ7kNvwGpQsDt&_nc_oc=Admp8TUkzSSfxxdyPwRLm0GusPWffLeHDwXbvX6Q3r03hXAzEDRi0ocrsJyO0U_3DYM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=O7uvVzrwlaUiTtQ3oKT-cA&oh=00_Afe2thSLY2MjsBCcTRuQ5g9uyl85Img7IjGX6Z2AW8gg8g&oe=68F4F003",
    comments: 0,
    likes: 4,
    isVideo: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1633174148414-e497c4e02505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29mZmVlJTIwcm9hc3Rpbmd8ZW58MXx8fHwxNzU3NTkzMzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 89,
    isVideo: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1744212934844-36c43ba07a74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGZhbWlseSUyMHJlY2lwZSUyMGJvb2t8ZW58MXx8fHwxNzU3NTkzMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 198,
    isVideo: false,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1696861270495-7f35c35c3273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGJ1c2luZXNzJTIwaGFuZHNoYWtlJTIwcGFydG5lcnNoaXB8ZW58MXx8fHwxNTc1OTM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 156,
    isVideo: false,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1678572823447-45fc146df43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpJTIwY291bnRlciUyMG1lYXRzJTIwY2hlZXNlfGVufDF8fHx8MTc1NzU5MzM3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 112,
    isVideo: false,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBldmVudCUyMGN1c3RvbWVycyUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NTc1OTM2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 234,
    isVideo: true,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1752494746969-b93a4dfc722c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjByb2FzdGVyJTIwc3VwcGxpZXIlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1NzU5MzYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 94,
    isVideo: false,
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1571500810878-60a8f568ffb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwc2FuZHdpY2glMjBwYW5pbml8ZW58MXx8fHwxNTc1OTMxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 178,
    isVideo: false,
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1716703742287-2b06c3c6d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMHN0YWZmJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTc1OTM2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 87,
    isVideo: false,
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NTc0ODg5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 134,
    isVideo: false,
  },
];

/**
 * Componente de perfil de Instagram
 * Simula la interfaz real de Instagram con posts, highlights y estadísticas
 */
export function InstagramProfile({ width = 250, height = 600 }: InstagramProfileProps) {
  return (
    <div className="overflow-scroll" style={{ width, height }}>
      <div className="w-full bg-white dark:bg-gray-900">
        {/* Profile Header */}
        <div className="pl-2 py-2">
          <div className="flex items-start gap-4 mb-2">
            <div className="relative">
              <ImageWithFallback
                src={RESOURCES_MEDIA.INSTAGRAM_LOGO}
                alt={INSTAGRAM_PROFILE_DATA.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
              />
            </div>

            <div className="mt-1">
              <div className="flex items-center gap-1 text-center">
                <div>
                  <div className="font-semibold text-[12px] text-gray-900 dark:text-white">
                    {INSTAGRAM_PROFILE_DATA.posts}
                  </div>
                  <div className="text-[10px] text-gray-600 dark:text-gray-400">publicaciones</div>
                </div>
                <div>
                  <div className="font-semibold text-[12px] text-gray-900 dark:text-white">
                    {INSTAGRAM_PROFILE_DATA.followers}
                  </div>
                  <div className="text-[10px] text-gray-600 dark:text-gray-400">seguidores</div>
                </div>
                <div>
                  <div className="font-semibold text-[12px] text-gray-900 dark:text-white">
                    {INSTAGRAM_PROFILE_DATA.following}
                  </div>
                  <div className="text-[10px] text-gray-600 dark:text-gray-400">siguiendo</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-3">
            <h2 className="font-semibold text-xs mb-1 text-gray-900 dark:text-white">
              {INSTAGRAM_PROFILE_DATA.name}
            </h2>
            <p className="text-[10px] whitespace-pre-line text-gray-700 dark:text-gray-300">
              {INSTAGRAM_PROFILE_DATA.bio}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-around mb-1">
            <Button variant="secondary" className="w-15 h-5">
              <span className="text-[11px]">Seguir</span>
            </Button>
            <Button variant="secondary" className="w-15 h-5">
              <span className="text-[11px]">Mensaje</span>
            </Button>
            <Button variant="secondary" className="w-15 h-5">
              <span className="text-[11px]">Llamar</span>
            </Button>
          </div>
        </div>

        {/* Highlights */}
        <div className="px-4 mb-2">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {INSTAGRAM_HIGHLIGHTS.map((highlight) => (
              <div key={highlight.id} className="shrink-0 text-center">
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-pink-500 to-orange-500 p-0.5">
                  <ImageWithFallback
                    src={highlight.cover}
                    alt={highlight.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-[10px] text-gray-600 dark:text-gray-400 truncate max-w-8">
                  {highlight.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button className="flex-1 py-3 flex items-center justify-center border-b-2 border-gray-900 dark:border-white">
              <Grid3X3 className="w-4 h-4 text-gray-900 dark:text-white" />
            </button>
            <button className="flex-1 py-3 flex items-center justify-center border-b-2 border-transparent">
              <Play className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
            <button className="flex-1 py-3 flex items-center justify-center border-b-2 border-transparent">
              <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1">
          {INSTAGRAM_POSTS.map((post) => (
            <div key={post.id} className="relative aspect-square group cursor-pointer">
              <ImageWithFallback
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover"
              />
              {post.isVideo && (
                <div className="absolute top-2 right-2">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-white" />
                    <span className="font-semibold text-[8px]">{post.likes.toLocaleString()}</span>
                  </div>
                  {post.comments !== undefined && (
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 fill-white" />
                      <span className="font-semibold text-[8px]">{post.comments}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
