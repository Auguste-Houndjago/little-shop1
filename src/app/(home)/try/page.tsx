import CardProduct from "@/components/home/CardProduct";
import { fetchFeaturedProducts } from "@/lib/products";
import type { Color, Image, Product, Size } from '@prisma/client';

export type ProductFeatured = {
	images: Image[];
	category: {
		name: string;
	};
	color: Color;
	size: Size;

} & Product;

const Try = async () => {

    const products: ProductFeatured[] = await fetchFeaturedProducts();


    return ( 

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.map((product, productIndex) => (
            <CardProduct
                key={productIndex}
                product={product}
            />
        ))}
    </div> 
     );
}
 
export default Try;