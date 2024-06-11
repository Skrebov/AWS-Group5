import {Customer, Product} from "./model";

function mapToCustomer(obj: any): Customer{
    return {
        birthdate: obj.birthdate,
        email: obj.email,
        gender: obj.gender,
        name: obj.name,
        phone: obj.phone,
        pk: obj.pk,
        sk: obj.sk,
    }
}

function mapToProduct(obj: any): Product{
    return {
        category: obj.category,
        name: obj.name,
        pk: obj.pk,
        sk: obj.sk,
        price: obj.price,
        quantity: obj.quantity,
    }
}

//this is for a list of customers
function mapCustomers(list: any): Customer[] {
    return list.map(mapToCustomer);
}

//this is for a list of products
function mapProducts(list: any): Product[] {
    return list.map(mapToProduct);
}


export {mapToCustomer, mapToProduct, mapCustomers, mapProducts}