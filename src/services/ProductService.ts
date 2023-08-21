import httpCommon from "../http-common"
import IProductData from "../types/Product"
import authHeader from "./Auth-Header";

const getAll = () => {
    return httpCommon.get<Array<IProductData>>("/user/products", { headers: authHeader() });
}

const findByName = (name: string) => {
    return httpCommon.get<IProductData>(`/user/products/search?name=${name}`, { headers: authHeader() });
}

const ProductService = {
    getAll,
    findByName
};

export default ProductService;