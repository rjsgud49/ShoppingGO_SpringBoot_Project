import { useEffect, useState } from "react";
import { getOrders, deleteOrder, updateOrderStatus } from "../api/orders";

const Orders = () => {
    const [list, setList] = useState([]);

    const load = () => {
        getOrders().then((res) => setList(res.data));
    };

    useEffect(() => {
        load();
    }, []);

    const statuses = ["PENDING", "SHIPPING", "COMPLETED", "CANCELED"];

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">주문 목록</h1>

            {list.map((order: any) => (
                <div
                    key={order.id}
                    className="border p-4 rounded mb-3 bg-white shadow"
                >
                    <p className="font-semibold">주문번호: {order.id}</p>
                    <p>총액: {(order.totalPrice ?? 0).toLocaleString()}원</p>
                    <p className="mt-2">
                        현재 상태:{" "}
                        <span className="font-bold text-blue-600">
                            {order.status}
                        </span>
                    </p>

                    {/* 상태 변경 드롭다운 */}
                    <select
                        className="mt-3 border px-2 py-1 rounded"
                        value={order.status}
                        onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value).then(load)
                        }
                    >
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    {/* 삭제 버튼 */}
                    <button
                        onClick={() => deleteOrder(order.id).then(load)}
                        className="bg-red-600 text-white px-3 py-1 rounded mt-3 block"
                    >
                        삭제
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Orders;
