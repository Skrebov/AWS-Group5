import { Customer, Invoice, Product, InvoiceProduct } from "./model";

function mapToCustomer(obj: any): Customer {
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

function mapToProduct(obj: any): Product {
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

function mapToInvoiceProduct(obj: any): InvoiceProduct {
    return {
        quantity: obj.quantity,
        pk: obj.pk,
        sk: obj.sk,
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