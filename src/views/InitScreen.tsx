import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useSwipeable } from "react-swipeable";
import { mockOnboarding } from "../helpers/examples";
import { useNavigate } from "react-router";
import { useAuthStore } from "../presentation/core/useAuthStore";

export const InitScreen = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const { status } = useAuthStore();

  const indexFinal: number = Math.min(
    mockOnboarding.length,
    mockOnboarding.length - 1,
  );

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((i) => Math.min(i + 1, mockOnboarding.length - 1)),
    onSwipedRight: () => setIndex((i) => Math.min(i - 1, 0)),
    trackMouse: true,
  });

  useEffect(() => {
    if (status === 'authenticated') navigate('/dashboard/home')
  }, [])

  return (
    <div {...handlers} className="overflow-hidden w-full">
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {mockOnboarding.map((item, i) => (
          <div
            key={i}
            className="min-w-full flex flex-col items-center px-5 gap-8"
          >
            <img src={item.image} alt={item.title} className="h-64 w-64" />
            <h2 className="font-semibold text-2xl">{item.title}</h2>
            <p className="text-text text-base text-center">
              {item.description}
            </p>
            {index === indexFinal && (
              <input
                className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl text-center"
                placeholder="Apodo"
              />
            )}
            <Button
              onClick={() => {
                if (index === indexFinal) {
                  navigate("/welcome");
                } else {
                  setIndex((i) => Math.min(i + 1, mockOnboarding.length - 1));
                }
              }}
              text="Continuar"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
