import {Customer, DataItem, Invoice, Product} from "./model";

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

function mapToInvoice(obj: any): Invoice {
    return {
        date: obj.date,
        pk: obj.pk,
        sk: obj.sk,
    }
}

function mapToDataItem(obj: any): DataItem {
    return {
        name: obj['month_year'].slice(8),
        total: obj.total,
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


//this is for a list of invoices
function mapInvoices(list: any): Invoice[] {
    return list.map(mapToInvoice);
}

function mapDataItems(list: any): DataItem[] {
    return list.map(mapToDataItem);
}

export {mapToCustomer, mapToProduct, mapCustomers, mapProducts, mapInvoices, mapDataItems}