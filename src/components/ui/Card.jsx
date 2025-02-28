import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartSlice";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const { title, price, description, image, rating } = item;
  const id = localStorage.getItem("isActive");

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden mx-auto max-w-[350px] max-h-[650px] p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate max-w-[230px]">
          {title.slice(0, 20)}
          {title.length > 20 && "..."}
        </h3>
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={image}
          alt={title}
          className="object-contain aspect-video w-full max-h-[200px] rounded-lg shadow-md transition-transform transform hover:scale-105"
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold">Description:</span>{" "}
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">${price}</h3>
        <div className="flex items-center text-sm text-yellow-500">
          <span className="mr-1">⭐ {rating.rate}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="px-6 py-2 rounded-lg text-white text-sm font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-300 w-full max-w-[220px]"
          onClick={() => dispatch(addItemToCart(item, id))}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Card;
