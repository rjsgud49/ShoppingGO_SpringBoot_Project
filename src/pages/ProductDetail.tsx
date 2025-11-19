    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import { getProductById } from "../api/products";
    import { addToCart } from "../api/cart";

    const ProductDetail = () => {
        const { id } = useParams();
        const [product, setProduct] = useState<any>(null);

        useEffect(() => {
            getProductById(Number(id)).then((res) => setProduct(res.data));
        }, []);

        const handleAdd = async () => {
            await addToCart({
                userId: 11,
                productId: product.id,
                quantity: 1,
            });
            alert("장바구니 추가 완료");
        };

        if (!product) return <p>로딩중...</p>;

        return (
            <div className="p-6 max-w-2xl mx-auto">
                <img src={product.imageUrl} className="w-full rounded" />

                <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                <p className="text-xl mt-2">
                    {product.price.toLocaleString()}원
                </p>

                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white w-full py-3 mt-6 rounded"
                >
                    장바구니 담기
                </button>
            </div>
        );
    };

    export default ProductDetail;
