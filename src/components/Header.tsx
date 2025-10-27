import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <Link to="/" className="text-2xl font-bold">🛍️ MyShop</Link>
            <nav className="space-x-4">
                <Link to="/" className="hover:underline">홈</Link>
                <Link to="/cart" className="hover:underline">장바구니</Link>
            </nav>
        </header>
    );
};

export default Header;
