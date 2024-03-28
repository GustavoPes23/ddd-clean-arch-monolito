import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "Customer 1",
    address: {
        street: "Street 1",
        number: 1,
        zip: "Zip",
        city: "City",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await createCustomerUseCase.execute(input);
        
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        });
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        
        await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Name is required");

        expect(customerRepository.create).not.toHaveBeenCalled();
    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
        
        await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Street is required");

        expect(customerRepository.create).not.toHaveBeenCalled();
    });
});