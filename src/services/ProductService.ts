import httpCommon from "../http-common"
import IProductData from "../types/Product"

const getAll = () => {
    return httpCommon.get<Array<IProductData>>("/products");
}

const findByName = (name: string) => {
    return httpCommon.get<IProductData>(`/products/search?name=${name}`);
}

const ProductService = {
    getAll,
    findByName
};

export default ProductService;