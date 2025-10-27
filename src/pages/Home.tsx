import { products } from "../data/products.tsx";
import ProductCard from "../components/ProductCard";

const Home = () => {
    return (
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
};

export default Home;
