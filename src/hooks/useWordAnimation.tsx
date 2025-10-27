import { WordAnimationOptions } from "../types";

export const useWordAnimation = ({
  text,
  delayBetweenWords = 0.15,
  shouldAnimate = true,
  startDelay = 0,
}: WordAnimationOptions) => {
  const words = text.split(" ");

  const animatedText = shouldAnimate ? (
    <>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block animate-slide-up-word mr-[0.25em]"
          style={{
            animationDelay: `${startDelay + index * delayBetweenWords}s`,
            animationFillMode: "both",
          }}
        >
          {word}
        </span>
      ))}
    </>
  ) : null;

  return animatedText;
};
