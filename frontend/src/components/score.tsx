import { X } from "lucide-react";

export default function Score({ finalScore }: { finalScore: number }) {
  const percentage = (finalScore / 5) * 100;

  let bgColor;
  switch (true) {
    case finalScore > 4:
      bgColor = "#16a34a";
      break;
    case finalScore >= 2 && finalScore <= 4:
      bgColor = "#ca8a04";
      break;
    default:
      bgColor = "#dc2626";
      break;
  }

  console.log(finalScore, bgColor);
  return (
    <div className="flex gap-4 min-h-10 items-center justify-center py-8 w-full">
      <h2 className="text-xl text-heading-1 font-semibold">
        La puntuación de tu C.V. es:
      </h2>
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute w-full h-full rounded-full bg-gray-300 "></div>
        <div
          className={`absolute w-full h-full rounded-full ${bgColor} bg-red-600`}
          style={{
            background: `conic-gradient(${bgColor} ${percentage}%, transparent 0)`,
            transform: "rotate(-90deg)",
          }}
        ></div>
        <div className="absolute w-12 h-12 rounded-full bg-background flex items-center justify-center">
          <h3 className="font-bold text-heading-1">{finalScore}/5</h3>
        </div>
      </div>
    </div>
  );
}
