import { useRef, useState, type ReactNode } from "react";

interface Props {
  data: any[];
  children: ReactNode;
  hideDots?: boolean;
  width?: number;
  id?: string;
}

export const Carousel = ({ data, children, hideDots, width, id }: Props) => {
  const [index, setIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  let CARD_WIDTH: number;

  const handleScroll = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, offsetWidth } = carouselRef.current;
    CARD_WIDTH = width ?? offsetWidth;
    const currentIndex = Math.round(scrollLeft / CARD_WIDTH);

    setIndex(currentIndex);
  };

  return (
    <div id={id}>
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4"
      >
        {children}
      </div>
      {!hideDots && (
        <div className="mt-4 flex justify-center gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                carouselRef.current?.scrollTo({
                  left: i * CARD_WIDTH,
                  behavior: "smooth",
                });
              }}
              className={`h-1 w-4 rounded-full transition-all ${
                i === index ? "bg-buttonDark w-6" : "bg-dotStyle"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
