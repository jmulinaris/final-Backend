const ProductDTO = ({ _id, name, price, thumbnail }) => {
    return {
        name,
        price,
        thumbnail,
        id: _id,
    };
};

export default ProductDTO;