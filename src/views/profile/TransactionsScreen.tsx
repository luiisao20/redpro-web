import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useUser } from "../../presentation/user/useUser";
import { useEffect, useState } from "react";
import {
  type TransactionHistory,
  type UserData,
} from "../../interfaces/interface";
import { PointsComponent } from "../../components/PointsComponent";
import { FiltersComponent } from "../../components/FiltersComponent";
import { useHistory } from "../../presentation/history/useHistory";
import { TransactionComponent } from "../../components/TransactionComponent";

export const TransactionsScreen = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>();
  const [transactionsList, setTransactionsList] = useState<
    TransactionHistory[]
  >([]);
  const [filter, setFilter] = useState("");

  const { user } = useAuthStore();

  const { userQuery } = useUser(user?.id);
  const { historyQuery } = useHistory({ idClient: user?.id, filter });

  useEffect(() => {
    if (userQuery.data) setUserData(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (historyQuery.data) setTransactionsList(historyQuery.data);
  }, [historyQuery.data]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <div>
      <div className="flex mx-6 items-center mt-3 gap-4 mb-6">
        <IoArrowBackCircleOutline
          onClick={() => navigate(-1)}
          className="active:opacity-60"
          size={40}
        />
        <h2 className="text-[24px] font-semibold">Transacciones</h2>
      </div>
      <PointsComponent transactions points={userData?.points!} />
      <div className="my-6 px-6">
        <FiltersComponent
          transactions
          onSetFilter={setFilter}
          onCleanFilter={() => setFilter("")}
        />
      </div>
      {transactionsList.map((item) => (
        <TransactionComponent transaction={item} key={item.id} />
      ))}
    </div>
  );
};
