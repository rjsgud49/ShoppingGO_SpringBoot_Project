import { useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    if (!product) return <div className="p-8 text-center text-gray-500">상품을 찾을 수 없습니다.</div>;

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
            <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-2xl font-semibold mt-4">{product.price.toLocaleString()}원</p>
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                장바구니에 담기
            </button>
        </div>
    );
};

export default ProductDetail;
