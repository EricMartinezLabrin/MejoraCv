import Star from "@/components/icons/star";

export default function Rating({ props }: { props: any }) {
  const { score } = props;
  const empty = "w-4 h-4 ms-1 text-gray-300 dark:text-gray-500";
  const full = "w-4 h-4 text-yellow-300 ms-1";
  const maxStars = 5;
  const emptyStars = maxStars - score;

  return (
    <div className="flex items-center">
      {Array.from({ length: score }, (_, i) => (
        <Star key={i} className={full} />
      ))}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={i} className={empty} />
      ))}
    </div>
  );
}
