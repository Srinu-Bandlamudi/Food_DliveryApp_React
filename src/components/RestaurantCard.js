import { CDN_URL } from "../utils/constants"

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId } =
    resData.info;

  return (
    <div className="p-4 m-4 w-[220px] h-[400px] rounded-lg flex flex-col justify-between bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg w-[200px] h-[150px] object-cover"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div>
        <h3 className="font-bold p-3 text-lg">{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} Stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{resData.info.sla.deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;

    return (
      <div className="relative">
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg z-10">
          {resData?.info?.aggregatedDiscountInfoV3?.header +
            " " +
            resData?.info?.aggregatedDiscountInfoV3?.subHeader}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
