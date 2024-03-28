import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product 1",
      price: 10,
    };

    const useCase = new FindProductUseCase(productRepository);
    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async() => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    await productRepository.create(product);

    const useCase = new FindProductUseCase(productRepository);
    const input = {
      id: "123",
    };

    expect(async () => {
      return await useCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
