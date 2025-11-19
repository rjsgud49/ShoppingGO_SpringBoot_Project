import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
    const { token, logout } = useAuthStore();

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">ShoppingGO</Link>

            <nav className="space-x-6 flex items-center">
                <Link to="/products" className="hover:underline">상품</Link>
                <Link to="/cart" className="hover:underline">장바구니</Link>
                <Link to="/orders" className="hover:underline">주문내역</Link>

                {token ? (
                    <>
                        <button
                            className="hover:underline"
                            onClick={logout}
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">로그인</Link>
                        <Link to="/register" className="hover:underline">회원가입</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
