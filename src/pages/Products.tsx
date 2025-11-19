import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getProducts().then((res) => setList(res.data));
    }, []);

    return (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {list.map((p: any) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
};

export default Products;
