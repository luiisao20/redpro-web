import { useEffect, useState } from "react";
import { Button, GoBackButton } from "../components/Button";
import { useSwipeable } from "react-swipeable";
import { mockOnboarding } from "../helpers/examples";
import { useNavigate } from "react-router";
import { useAuthStore } from "../presentation/store/useAuthStore";
import { useNicknameStore } from "../presentation/store/useNickStore";

export const InitScreen = () => {
  const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/;
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const { status } = useAuthStore();
  const { setNickname } = useNicknameStore();

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
    if (status === "authenticated") navigate("/dashboard/home");
  }, []);

  return (
    <div {...handlers} className="overflow-hidden w-full relative">
      <GoBackButton onClick={() => navigate(-1)} />
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
            <h2 className="font-semibold text-2xl text-center">{item.title}</h2>
            <p className="text-text text-base text-center">
              {item.description}
            </p>
            {index === indexFinal && (
              <input
                className="bg-buttonLight border-buttonLight w-full text-4xl h-15 mx-10 border rounded-xl text-center"
                placeholder="Apodo"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            )}
            <Button
              onClick={() => {
                if (index === indexFinal) {
                  if (nickName.length < 4) {
                    setError({
                      show: true,
                      message: "¡El nombre está muy corto!",
                    });
                    return;
                  }

                  if (!regex.test(nickName)) {
                    setError({
                      show: true,
                      message: "El nombre sólo puede contener letras",
                    });
                    return;
                  }
                  navigate("/register");
                  setNickname(nickName);
                } else {
                  setIndex((i) => Math.min(i + 1, mockOnboarding.length - 1));
                }
              }}
              disabled={nickName.trim() === "" && index === indexFinal}
              text="Continuar"
            />
            {error && (
              <p className="text-red-500 text-sm my-1 ml-2">
                {error.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
