//Value object -> sem id, não é póssível modificar após criar
export default class Address {
    protected _street: string;
    protected _number: number;
    protected _zip: string;
    protected _city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }

    validate(): void {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }

        if (this._number === 0) {
            throw new Error("Number is required");
        }

        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }

        if (this._city.length === 0) {
            throw new Error("City is required");
        }
    }

    toString(): string {
        return `${this._street}, ${this._number}, ${this._zip} - ${this._city}`;
    }
}