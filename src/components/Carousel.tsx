import { useRef, useState, useEffect, type ReactNode } from "react";

interface Props {
  data: any[];
  children: ReactNode;
  hideDots?: boolean;
  width?: number;
  id?: string;
  classAdded?: string;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export const Carousel = ({
  data,
  children,
  hideDots,
  width,
  id,
  classAdded,
  autoScroll = false,
  autoScrollInterval = 3000,
}: Props) => {
  const [index, setIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const getCardWidth = () => width ?? carouselRef.current?.offsetWidth ?? 0;

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      if (isPaused.current) return;

      setIndex((prev) => {
        const next = prev >= data.length - 1 ? 0 : prev + 1;
        carouselRef.current?.scrollTo({
          left: next * getCardWidth(),
          behavior: "smooth",
        });
        return next;
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, data.length]);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const cardWidth = getCardWidth();
    setIndex(Math.round(scrollLeft / cardWidth));
  };

  return (
    <div id={id}>
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        onMouseEnter={() => {
          isPaused.current = true;
        }}
        onMouseLeave={() => {
          isPaused.current = false;
        }}
        onTouchStart={() => {
          isPaused.current = true;
        }}
        onTouchEnd={() => {
          isPaused.current = false;
        }}
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 ml-6 ${classAdded}`}
      >
        {children}
      </div>

      {!hideDots && (
        <div className="mt-4 flex justify-center gap-2">
          {data.map((_, i) => (
            <button
              key={i}
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
