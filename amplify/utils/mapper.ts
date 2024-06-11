import {Customer, Product} from "./model";

//TODO change eslint rule(s) to warning level
function mapToCustomer(queryObject: any): Customer{
    return {
        birthdate: queryObject.birthdate,
        email: queryObject.email,
        gender: queryObject.gender,
        name: queryObject.name,
        phone: queryObject.phone,
        pk: queryObject.pk,
        sk: queryObject.sk,
    }
}

function mapToProduct(queryObject: any): Product{
    return {
        category: queryObject.category,
        name: queryObject.name,
        pk: queryObject.pk,
        sk: queryObject.sk,
        price: queryObject.price,
        quantity: queryObject.quantity,
    }
}

export {mapToCustomer, mapToProduct}