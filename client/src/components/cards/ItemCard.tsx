import { FC } from "react";

type CardDataType = {
  name: string;
  shopName?: string;
  id?: string | number;
};

interface ItemCardProps {
  data: CardDataType[];
  isLoading?: boolean;
  handleClick: (item: any) => void;
}

const ItemCard: FC<ItemCardProps> = ({
  data = [],
  handleClick,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center items-center h-[10rem] text-xl">
        loading...
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="mt-6 flex justify-center items-center h-[10rem] text-xl">
        No data found
      </div>
    );
  }

  /**
   * TSX
   */
  return (
    <div className="w-full mt-6 grid grid-cols-12 gap-6">
      {data?.map((item: CardDataType, idx) => (
        <div
          key={idx}
          onClick={() => handleClick(item)}
          className="hover:scale-[1.02] ease-in-out duration-150 cursor-pointer col-span-3 bg-white shadow-md rounded-md py-8 px-6 text-mediumDark flex justify-between items-center"
        >
          <div className="flex flex-col gap-3">
            <div className="text-blue-400 text-2xl capitalize">
              {item.shopName ? item.shopName : item?.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
