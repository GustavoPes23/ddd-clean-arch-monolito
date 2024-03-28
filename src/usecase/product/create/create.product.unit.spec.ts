import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 10
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);
        
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        input.name = "";
        
        await expect(createProductUseCase.execute(input)).rejects.toThrow("Name is required");

        expect(productRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error when price is lower than zero", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        input.name = "Product 1";
        input.price = 0;
        
        await expect(createProductUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");

        expect(productRepository.create).not.toHaveBeenCalled();
    });
});