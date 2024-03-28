import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

//modelagem do domínio rico expressa o negócio
//deve se representar o estado correto e atual do elemento
//uma entidade por padrão sempre tem que se autovalidar -> não deve deixar para outra parte do sistema



//a entidade que o ORM cria é uma entidade focada em persistência -> chamada apenas de model(schema) e não de entidade
//entidade focada em negócio -> chamada de domínio

/* 
Complexidade de negócio
Domain
- Entity
 -- customer.ts(regra de negócio)

Complexidade acidental
infra - mundo externo
- Entity / Model
 -- customer.ts(get, set)
*/

export default class Customer extends Entity implements CustomerInterface {
    //id serve para identificar o Customer no sistema e não no banco
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super(id);
        this._name = name;
        this.validate(); //uma entidade por padrão sempre tem que se autovalidar -> não deve deixar para outra parte do sistema, por isso os getters e setters são vilões - trocar
        //o nome semantico de setter para outro como change

        if (this.notification.hasErrors("customer")) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    //uma entidade por padrão sempre tem que se autovalidar -> não deve deixar para outra parte do sistema
    validate(): void {
        // if (this._name.length === 0) {
        //     this.notification.addError({
        //         message: "Name is required",
        //         context: "customer",
        //     });
        // }

        // if (this.id.length === 0) {
        //     this.notification.addError({
        //         message: "Id is required",
        //         context: "customer",
        //     });
        // }


        //Validar atributo a atributo acaba sendo trabalhoso
        //Utilização de bibliotecas de validação de dados
        //com o mínimo de acoplamento
        CustomerValidatorFactory.create().validate(this);
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address | undefined {
        return this._address;
    }

    set address(address: Address) {
        this._address = address;
    }

    changeAddress(address: Address): void {
        this._address = address;
    }

    //changeName é diferente do set name, onde simplesmente é uma forma de mudar o atributo
    //changeName é um motivo de negócio
    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    isActive(): boolean {
        return this._active;
    }

    //regra de negócio, diz por que o _active existe
    activate(): void {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate customer");
        }

        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }

    set Address(address: Address) {
        this._address = address;
    }
}

//errado, porque o nome e o address inicializa em branco
//devemos garantir 100% das vezes que os dados estão consistêntentes, não consegue validar regra de negócio (objeto incompleto)
//deve ter os dados obrigatórios
//não existe cliente sem nome
// const customer = new Customer("123")
// const customer = new Customer("123", "")