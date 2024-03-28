import Product from "../../../domain/product/entity/product";
import type ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import type { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDto {
        return {
            products: product.map((data) => ({
                id: data.id,
                name: data.name,
                price: data.price
            }))
        }
    }
}