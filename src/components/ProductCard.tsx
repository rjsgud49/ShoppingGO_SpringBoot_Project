import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
                src={product.imageUrl}
                className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.price.toLocaleString()}원</p>

            <Link
                to={`/products/${product.id}`}
                className="block text-center bg-blue-600 text-white py-2 rounded mt-3"
            >
                상세 보기
            </Link>
        </div>
    );
};

export default ProductCard;
