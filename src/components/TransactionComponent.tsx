import { Colors } from "../assets/colors";
import { getFormattedDate } from "../helpers/format-date-long";
import type { TransactionHistory } from "../interfaces/interface";
import { TransactionLogo } from "./TransactionLogo";

interface Props {
  transaction: TransactionHistory;
}
export const TransactionComponent = ({ transaction }: Props) => {
  const {
    date,
    challengeDescription,
    challengeName,
    challengePoints,
    idChallenge,
    rewardDescription,
    rewardName,
    rewardPoints,
  } = transaction;
  return (
    <div className="py-4 px-6 flex flex-row justify-between gap-2 border-t border-t-gray/30">
      <div className="flex flex-row gap-4">
        <TransactionLogo
          color={idChallenge ? Colors.tabs : Colors.gray}
          className="shrink-0"
        />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold truncate">
            {idChallenge
              ? challengeName?.slice(0, 20)
              : rewardName?.slice(0, 20)}
          </p>
          <p className="line-clamp-1 text-xs">
            {idChallenge ? challengeDescription : rewardDescription}
          </p>
          <p
            className={`text-xs font-semibold ${idChallenge ? "text-textGreen" : "text-tint"}`}
          >
            {`${idChallenge ? `+ ${challengePoints}` : `- ${rewardPoints}`}`}{" "}
            PUNTOS
          </p>
        </div>
      </div>
      <p className="text-xs self-start font-semibold text-right whitespace-nowrap shrink-0">
        {getFormattedDate(date)}
      </p>
    </div>
  );
};
