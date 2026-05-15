import { RxCross2 } from "react-icons/rx";
import type { UserData } from "../../interfaces/interface";
import { useEffect, useState } from "react";
import { HiOutlineFire } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClientModal } from "../../core/database/modal/get-client-modal.action";
import { updateSeenModal } from "../../core/database/modal/update-seen-modal.action";

interface Props {
  data: UserData;
}

export const ModalInit = ({ data }: Props) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: content } = useQuery({
    queryFn: () => getClientModal(user?.id!),
    queryKey: ["modal", user?.id],
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: () => updateSeenModal(data.code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modal"] });
      document.body.style.overflow = "auto";
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error marking modal as seen:", error);
    },
  });

  const closeModal = () => {
    document.body.style.overflow = "auto";
    mutation.mutate();
    setOpen(false);
  };

  useEffect(() => {
    if (open && content) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, content]);

  if (!open || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[url('/images/modal-bg.png')] bg-cover bg-center bg-no-repeat relative border border-black/10 rounded-2xl shadow-2xl w-full max-w-3xl h-85 overflow-hidden animate-in zoom-in-95 duration-300 my-8">
        <button
          onClick={closeModal}
          className="hover:bg-black/5 p-1 border-[1.5px] border-black/20 rounded-full transition-colors text-black absolute right-2 top-2"
        >
          <RxCross2 size={12} />
        </button>
        <div className="flex flex-col justify-center items-center h-full">
          <img src="/images/crown.png" className="h-14 mb-2" alt="" />
          <h2 className="font-semibold text-[18px]">¡Hola, {data.name}!</h2>
          <img
            src={
              data.category === "BRONCE"
                ? "/images/modal-bronze.png"
                : data.category === "PLATA"
                  ? "/images/modal-silver.png"
                  : "/images/modal-gold.png"
            }
            alt=""
            className="w-3/4"
          />
          <p className="text-center mx-4 text-[11.5px] mb-6">{content}</p>
          <button
            onClick={async() => {
              await mutation.mutateAsync();
              navigate("/dashboard/challenges");
            }}
            className="px-10 py-2 rounded-lg flex items-center gap-1 font-semibold text-white bg-linear-to-r from-yellow-700 via-yellow-600 to-amber-400 shadow-2xs/40 shadow-yellow-950 hover:brightness-110 transition-all active:opacity-60"
          >
            <HiOutlineFire size={16} />
            <p className="font-normal text-[12px]">Ver retos</p>
          </button>
        </div>
      </div>
    </div>
  );
};
