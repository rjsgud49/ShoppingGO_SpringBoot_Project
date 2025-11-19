import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { updateCart, deleteCartItem } from "../api/cart";
import { createOrder } from "../api/orders";
import { AxiosError } from "axios";

const Cart = () => {
    const { items, loadCart } = useCartStore();

    // 안전한 currentUser 파싱
    const currentUserStr = localStorage.getItem("currentUser") ?? "{}";
    const currentUser = JSON.parse(currentUserStr);
    const userId: number = currentUser?.id ?? 1;

    // 장바구니 로딩
    useEffect(() => {
        loadCart(userId);
    }, [loadCart, userId]);

    const handleQty = async (id: number, qty: number) => {
        if (qty < 1) return;

        await updateCart({ cartItemId: id, quantity: qty });
        loadCart(userId);
    };

    const total = items.reduce(
        (sum, item) => sum + item.quantity * (item.price ?? 0),
        0
    );

    const handleOrder = async () => {
        if (items.length === 0) {
            alert("장바구니가 비어있습니다.");
            return;
        }

        // productId는 항상 number형이므로 그대로 사용
        const orderItems = items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        const payload = {
            userId,
            items: orderItems,
        };

        console.log("📦 주문 요청 payload:", payload);

        try {
            const res = await createOrder(payload); // payload 한 개 전달 구조로 맞춤

            alert("주문이 완료되었습니다!");
            console.log("주문 결과:", res);

            loadCart(userId);
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error("❌ 주문 실패:", err.response?.data);
            } else {
                console.error("❌ 주문 실패:", err);
            }
            alert("주문 중 오류가 발생했습니다.");
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">장바구니</h1>

            {items.length === 0 && (
                <div className="text-gray-500">장바구니가 비어 있습니다.</div>
            )}

            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between border p-4 rounded items-center"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                            <h2 className="font-bold text-lg">{item.productName}</h2>
                            <p className="text-gray-600">
                                {item.price?.toLocaleString()}원 × {item.quantity}개
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleQty(item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            +
                        </button>

                        <button
                            onClick={() => handleQty(item.id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            -
                        </button>

                        <button
                            onClick={() =>
                                deleteCartItem(item.id).then(() => loadCart(userId))
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            ))}

            <div className="text-xl font-bold mt-6 text-right">
                총 금액: {total.toLocaleString()}원
            </div>

            <button
                onClick={handleOrder}
                className="w-full mt-4 py-3 bg-blue-600 text-white text-lg font-bold rounded hover:bg-blue-700"
            >
                주문하기
            </button>
        </div>
    );
};

export default Cart;
