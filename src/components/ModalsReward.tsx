import { PiShoppingBagLight } from "react-icons/pi";
import { Button } from "./Button";
import { ModalComponent } from "./ModalComponent";
import { useEffect, useState, type ReactNode } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import { GoVerified } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";

interface Props {
  open: boolean;
  loading?: boolean;

  onClose: () => void;
  onUndone?: () => void;
  onFinish: () => void;
}

interface StepProps {
  loading?: boolean;

  onContinue?: () => void;
  onClose?: () => void;
}

const ModalRedeem = ({ onClose, onContinue }: StepProps) => (
  <>
    <PiShoppingBagLight size={100} color="#05A044" />

    <h2 className="font-semibold text-center text-xl leading-5">
      ¿Confirmas el canje de tus puntos?
    </h2>
    <p className="text-gray text-center">
      Este canje descontará de tus puntos. Asegúrate que deseas continuar con
      esta acción.
    </p>
    <Button text="Canjear ahora" onClick={onContinue} />
    <Button text="Cancelar" variant="cancel" onClick={onClose} />
  </>
);

const ModalProcessing = ({ onContinue }: StepProps) => {
  useEffect(() => {
    setTimeout(() => onContinue!(), 3000);
  }, []);

  return (
    <>
      <PiSpinnerGapBold size={100} color="#05A044" className="animate-spin" />
      <h2 className="font-semibold text-center text-xl leading-5">
        ¿Confirmas el canje de tus puntos?
      </h2>
      <p className="text-gray text-center">
        Este canje descontará de tus puntos. Asegúrate que deseas continuar con
        esta acción.
      </p>
      <Button text="Canjear ahora" loading />
    </>
  );
};

const ModalOk = ({ onContinue }: StepProps) => {
  useEffect(() => {
    setTimeout(() => onContinue!(), 3000);
  }, []);
  return (
    <>
      <GoVerified size={100} className="animate-pulse" color="#05A044" />
      <h2 className="font-semibold text-center text-xl leading-5">
        ¡Excelente elección!
      </h2>
      <p className="text-gray text-center">
        Tu pedido será entregado la próxima semana
      </p>
      <Button text="Confirmado" disabled />
    </>
  );
};

const ModalTruck = ({ onClose }: StepProps) => {
  return (
    <>
      <TbTruckDelivery size={100} className="animate-pulse" color="#05A044" />
      <h2 className="font-semibold text-center text-xl leading-5">
        Pedido en camino
      </h2>
      <p className="text-gray text-center">
        Te notificaremos cuando se haya completado el envío
      </p>
      <Button text="En camino" onClick={onClose} />
    </>
  );
};

export const ModalsReward = ({
  open,

  onClose,
  onFinish = () => {},
}: Props) => {
  const [stepsNumber, setStepsNumber] = useState<number>(0);

  const handleNextStep = () => setStepsNumber((prev) => prev + 1);

  const handleClose = () => {
    if (stepsNumber === 1 || stepsNumber === 2) return;

    if (stepsNumber === steps.length - 1 || stepsNumber === 0)
      setStepsNumber(0);

    onClose();
  };

  const steps: ReactNode[] = [
    <ModalRedeem onContinue={handleNextStep} onClose={handleClose} />,
    <ModalProcessing onContinue={handleNextStep} />,
    <ModalOk onContinue={handleNextStep} />,
    <ModalTruck
      onClose={() => {
        handleClose();
        onFinish();
      }}
    />,
  ];

  return (
    <ModalComponent open={open} onClose={onClose}>
      <div className="bg-white min-w-80 rounded-xl py-8 px-10 flex flex-col justify-center items-center border border-green-400 gap-4">
        {steps[stepsNumber]}
      </div>
    </ModalComponent>
  );
};
