const ProductDTO = (product) => {
    return {
        _id: product.id,
        thumbnail: product.thumbnail,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock
    };
};

export default ProductDTO;