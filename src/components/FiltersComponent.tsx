import { useEffect, useState } from "react";
import { ButtonFilter, ButtonSubFilter } from "./Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa6";

interface Props {
  rewards?: boolean;

  onSetFilter?: (filter: string) => void;
  onCleanFilter?: () => void;
}

export const FiltersComponent = ({
  rewards,
  onSetFilter = () => {},
  onCleanFilter = () => {},
}: Props) => {
  const [filterList, setFilterList] = useState({
    show: false,
    text: "",
  });
  const [subFilter, setSubFilter] = useState({
    show: false,
    text: "",
  });
  const [mainList, setMainList] = useState<string[]>([]);

  const list: string[] = ["Activos", "Próximos"];

  const rewardsList: string[] = ["Canjeables", "No canjeables"];
  const challengesList: string[] = ["Por estado"];

  useEffect(() => {
    if (rewards) setMainList(rewardsList);
    else setMainList(challengesList);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Filtrar por:</h2>
        {!filterList.show ? (
          <div className="flex gap-2 items-start">
            {mainList.map((item, index) => (
              <ButtonFilter
                key={index}
                title={item}
                onClick={() => {
                  setFilterList({ show: true, text: item });
                  if (rewards) onSetFilter(item);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <ButtonFilter title={filterList.text} variant="black" />
            <IoIosCloseCircleOutline
              size={40}
              className="active:opacity-60"
              onClick={() => {
                setFilterList({ show: false, text: "" });
                if (rewards) onCleanFilter();
              }}
            />
          </div>
        )}
      </div>
      {filterList.show && !rewards && (
        <div className="px-6 py-4">
          {!subFilter.show ? (
            <div className="flex flex-col gap-4 pb-4 border-b-2">
              {list.map((item, index) => (
                <button
                  className="flex justify-between active:opacity-60"
                  onClick={() => setSubFilter({ show: true, text: item })}
                  key={index}
                >
                  <p>{item}</p>
                  <FaRegCircle />
                </button>
              ))}
            </div>
          ) : (
            <ButtonSubFilter
              title={subFilter.text}
              onClick={() => setSubFilter({ show: false, text: "" })}
            />
          )}
        </div>
      )}
    </div>
  );
};
