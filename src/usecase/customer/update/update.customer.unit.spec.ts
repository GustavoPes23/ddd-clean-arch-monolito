import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Customer 1",
        new Address(
            "Street 1", 
            1, 
            "Zip", 
            "City"
        )
);

const input = {
    id: customer.id,
    name: "Customer 1 Updated",
    address: {
        street: "Street 1 Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
};

describe("Unit test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await updateCustomerUseCase.execute(input);
        expect(output).toEqual(input);
    });
})