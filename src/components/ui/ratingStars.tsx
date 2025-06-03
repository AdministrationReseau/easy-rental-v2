
import { Star } from "lucide-react";

export const RatingStars = ({ stars }: { stars: number }) => {
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
      ))}
      {hasHalfStar && (
        <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" style={{ clipPath: 'inset(0 50% 0 0)' }} />
      )}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} className="text-gray-300 w-5 h-5" />
      ))}
    </div>
  );
};