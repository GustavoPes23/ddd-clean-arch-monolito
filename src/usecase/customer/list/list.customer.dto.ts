//dto em branco para futuramente passar páginação, filtros e etc.
export interface InputListCustomerDto {}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    }
}

export interface OutputListCustomerDto {
    customers: Customer[];
}