//Não utilizar a mesma interface porque são coisas diferentes, motivos diferentes, podem mudar futuramente por razões diferentes - SRP
export interface InputCreateCustomerDto {
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
}

export interface OutputCreateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
}