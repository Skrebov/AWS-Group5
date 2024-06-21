import {Customer, DataItem, Invoice, Product, RecentPurchase, InvoiceProduct} from "./model";

function mapToCustomer(obj: any): Customer {
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
    return {
        pk: obj.pk,
        sk: obj.sk,
        date: obj.date,
    }
}

function mapToInvoiceProduct(obj: any): InvoiceProduct {
    return {
        pk: obj.pk,
        sk: obj.sk,
        quantity: obj.quantity,
    }
}

function mapToDataItem(obj: any): DataItem {
    return {
        name: obj['month_year'].slice(8),
        total: obj.total,
    }
}

function mapToRecentPurchase(obj: any): RecentPurchase {
    return {
        pk: obj.pk,
        date: obj.date,
        email: obj.email,
        customerName: obj.customerName,
        totalAmount: obj.totalAmount,
        type: obj.type,
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

function mapDataItems(list: any): DataItem[] {
    return list.map(mapToDataItem);
}

function mapRecentPurchases(list: any): RecentPurchase[] {
    return list.map(mapToRecentPurchase)
}

export { mapToCustomer, mapToProduct, mapToInvoice, mapToInvoiceProduct, mapCustomers, mapProducts, mapInvoices, mapInvoiceProducts, mapDataItems, mapRecentPurchases }
