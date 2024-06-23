import {FunctionComponent, useEffect, useState} from "react";
import Heading from "@/components/shared/heading.tsx";
import {Product} from "../../../amplify/utils/model.ts";

type Props = {
    customerId: string;
    closeModal: () => void;
    getData: (customerId: string) => Promise<Product[]>;
    mode: 'recommendation' | 'invoice'
};

const ProductModal: FunctionComponent<Props> = ({
                                                    customerId,
                                                    closeModal,
                                                    getData,
                                                    mode
                                                }) => {
    const [productsData, setProductsData] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts(customerId);
            setProductsData(products);
        };

        fetchProducts().then();
    }, [customerId]);

    const getProducts = async (id: string) => {
        return await getData(id)
    }

    function formatPrice(amount: number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    }

    return (
        <div className="px-2">
            <Heading
                title={mode === 'invoice' ? "Products of " + customerId : "Recommended Products"}
                className="space-y py-4 text-center"
            />
            <div className="overflow-y-auto h-96">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {productsData.length > 0 ? (
                        productsData.map((product, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatPrice(+product.price)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className="px-6 py-4">
                            <td>Loading...</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )

};
export default ProductModal
