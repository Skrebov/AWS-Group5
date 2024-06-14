import { Customer, Invoice, Product, InvoiceProduct } from "./model";

function mapToCustomer(obj: any): Customer {
    if (!obj) throw new Error('Null object given to mapToCustomer');
    return {
        pk: obj.pk,
        sk: obj.sk,
        birthdate: obj.birthdate,
        email: obj.email,
        gender: obj.gender,
        name: obj.name,
        phone: obj.phone,
    }
}

function mapToProduct(obj: any): Product {
    if (!obj) throw new Error('Null object given to mapToProduct');
    return {
        pk: obj.pk,
        sk: obj.sk,
        category: obj.category,
        name: obj.name,
        price: obj.price,
        quantity: obj.quantity,
    }
}

function mapToInvoice(obj: any): Invoice {
    if (!obj) throw new Error('Null object given to mapToInvoice');
    return {
        pk: obj.pk,
        sk: obj.sk,
        date: obj.date,
    }
}

function mapToInvoiceProduct(obj: any): InvoiceProduct {
    if (!obj) throw new Error('Null object given to mapToInvoiceProduct');
    return {
        pk: obj.pk,
        sk: obj.sk,
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


//this is for a list of invoices
function mapInvoices(list: any): Invoice[] {
    return list.map(mapToInvoice);
}

//this is for a list of invoice products
function mapInvoiceProducts(list: any): InvoiceProduct[] {
    return list.map(mapToInvoiceProduct);
}

export { mapToCustomer, mapToProduct, mapToInvoice, mapToInvoiceProduct, mapCustomers, mapProducts, mapInvoices, mapInvoiceProducts }