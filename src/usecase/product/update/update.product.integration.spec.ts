import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const product = new Product("123", "Product 1", 10);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const output = {
      id: "123",
      name: "Product updated",
      price: 11,
    };

    const productUpdated = new Product(output.id, output.name, output.price);
    await productRepository.update(productUpdated);

    const useCase = new UpdateProductUseCase(productRepository);
    const result = await useCase.execute(output);

    expect(result).toEqual(output);
  });
});
