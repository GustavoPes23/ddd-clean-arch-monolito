import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const Product = ProductFactory.create(
    "a",
    "Product 1",
    10
);

const input = {
    id: Product.id,
    name: "Product changed",
    price: 11,
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(Product)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
};

describe("Unit test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const output = await updateProductUseCase.execute(input);
        expect(output).toEqual(input);
    });
})