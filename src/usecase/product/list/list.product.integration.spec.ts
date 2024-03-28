import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
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

  it("should list all products", async () => {
    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("333", "Product 2", 11);

    const productRepository = new ProductRepository();
    await productRepository.create(product);
    await productRepository.create(product2);

    const output = {
      products: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    };

    const useCase = new ListProductUseCase(productRepository);
    const result = await useCase.execute(output);

    expect(result).toEqual(output);

    expect(output.products).toHaveLength(2);
    expect(output.products[0].id).toBe(product.id);
    expect(output.products[0].name).toBe(product.name);
    expect(output.products[0].price).toBe(product.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
