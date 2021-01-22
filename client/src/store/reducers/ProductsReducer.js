const initState = {
    products: 
        [
            {
            tittle: 'Remera',
            description: `Running reinvented. These high-performance neutral running shoes deliver unrivalled comfort and energy return. The lightweight and propulsive shoes have a seamless knit upper that's engineered with motion weave technology to provide stretch while also holding your foot in place as you run. The second-skin fit follows the shape of your foot to reduce pressure points. adidas Primeknit 360 adidas Primeknit upper wraps the foot with an engineered fit for targeted support that enhances movement Endless energy Boost is our most responsive cushioning ever, delivering incredible energy return: The more energy you give, the more you get 3D Heel frame Fitcounter moulded heel counter provides a natural fit that allows optimal movement of the Achilles Support through your stride Torsion Spring is integrated in the midsole to provide support during landing and propulsion at toe-off`,
            price: 750,
            quantity: 1,
            id: 1,
            Reviews: 'Reviews',
            img: 'https://www.remerasya.com/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/r/e/remera_negra_lisa_1.jpg',
            ranking: 10
        },
        {
            tittle: 'Pantalon',
            description: `Running reinvented. These high-performance neutral running shoes deliver unrivalled comfort and energy return. The lightweight and propulsive shoes have a seamless knit upper that's engineered with motion weave technology to provide stretch while also holding your foot in place as you run. The second-skin fit follows the shape of your foot to reduce pressure points. adidas Primeknit 360 adidas Primeknit upper wraps the foot with an engineered fit for targeted support that enhances movement Endless energy Boost is our most responsive cushioning ever, delivering incredible energy return: The more energy you give, the more you get 3D Heel frame Fitcounter moulded heel counter provides a natural fit that allows optimal movement of the Achilles Support through your stride Torsion Spring is integrated in the midsole to provide support during landing and propulsion at toe-off`,
            price: 1500,
            quantity: 5,
            id: 2,
            Reviews: 'Reviews',
            img: 'https://www.doiteargentina.com.ar/wp-content/uploads/2018/12/pantalon-doite-kawescar-desmontable-trekking-hombre-01.jpg',
            ranking: 10
        },
        {
            tittle: 'Zapatos',
            description: `Running reinvented. These high-performance neutral running shoes deliver unrivalled comfort and energy return. The lightweight and propulsive shoes have a seamless knit upper that's engineered with motion weave technology to provide stretch while also holding your foot in place as you run. The second-skin fit follows the shape of your foot to reduce pressure points. adidas Primeknit 360 adidas Primeknit upper wraps the foot with an engineered fit for targeted support that enhances movement Endless energy Boost is our most responsive cushioning ever, delivering incredible energy return: The more energy you give, the more you get 3D Heel frame Fitcounter moulded heel counter provides a natural fit that allows optimal movement of the Achilles Support through your stride Torsion Spring is integrated in the midsole to provide support during landing and propulsion at toe-off`,
            price: 7500,
            quantity: 20,
            id: 3,
            Reviews: 'Reviews',
            img: 'https://i.linio.com/p/50ae03d67c392c8a6179c1cb31e9aee7-product.jpg',
            ranking: 10
        },
        {
            tittle: 'Buzo',
            description: `Running reinvented. These high-performance neutral running shoes deliver unrivalled comfort and energy return. The lightweight and propulsive shoes have a seamless knit upper that's engineered with motion weave technology to provide stretch while also holding your foot in place as you run. The second-skin fit follows the shape of your foot to reduce pressure points. adidas Primeknit 360 adidas Primeknit upper wraps the foot with an engineered fit for targeted support that enhances movement Endless energy Boost is our most responsive cushioning ever, delivering incredible energy return: The more energy you give, the more you get 3D Heel frame Fitcounter moulded heel counter provides a natural fit that allows optimal movement of the Achilles Support through your stride Torsion Spring is integrated in the midsole to provide support during landing and propulsion at toe-off`,
            price: 1700,
            quantity: 3,
            id: 4,
            Reviews: 'Reviews',
            img: 'https://d26lpennugtm8s.cloudfront.net/stores/144/702/products/buzo_franco_grismelange-1-copia1-8de0fc1cd56341bcbe15797156441482-480-0.jpg',
            ranking: 10
        }
    ], 
    product: {}
     
}

const ProductsReducer = (state = initState, action) => {
    console.log(typeof action.id)
    switch(action.type){
        case "PRODUCT":
            return {
                ...state,
                product: state.products.find(product => product.id === parseInt(action.id))
            }
            default:
            return state;
    }
}

export default ProductsReducer