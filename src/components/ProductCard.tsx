import type{ Product } from "../types/product";
import { Link } from "react-router-dom";

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-500">{product.price.toLocaleString()}원</p>
            <Link
                to={`/product/${product.id}`}
                className="mt-2 inline-block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
            >
                상세보기
            </Link>
        </div>
    );
};

export default ProductCard;
