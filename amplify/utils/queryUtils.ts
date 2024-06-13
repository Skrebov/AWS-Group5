import { generateClient } from "aws-amplify/api";
import { Schema } from "../data/resource";
import { Customer, Product, Invoice, InvoiceProduct } from "./model";
import { mapCustomers, mapInvoices, mapProducts, mapToCustomer, mapToProduct, mapToInvoice, mapInvoiceProducts } from "./mapper";

const client = generateClient<Schema>();

async function getByPKandSK(pk: string, sk: string) {
    return await client.queries.getByPKandSK({ pk: pk, sk: sk })
}

export async function getCustomer(customer: string): Promise<Customer> {
    const queryResult = await getByPKandSK(customer, customer);
    return mapToCustomer(queryResult?.data);
}

export async function getProduct(product: string): Promise<Product> {
    const queryResult = await getByPKandSK(product, product);
    return mapToProduct(queryResult?.data);
}

async function getByType(type: string) {
    return await client.queries.getByType({ type: type });
}

export async function getCustomers(): Promise<Customer[]> {
    const queryResult = await getByType('customer');
    return mapCustomers(queryResult?.data?.items);
}

export async function getProducts(): Promise<Product[]> {
    const queryResult = await getByType('product');
    return mapProducts(queryResult?.data?.items);
}

export async function getInvoices() {
    const queryResult = await getByType('invoice');
    return mapInvoices(queryResult?.data?.items);
}

export async function getProductsByCategory(category: string) {
    const queryResult = await client.queries.getProductsByCategory({ category: category })
    return mapProducts(queryResult?.data?.items);
}

export async function scan() {
    return await client.queries.scan();
}

async function getBySKAndType(sk: string, type: string) {
    return await client.queries.getBySKandType({ sk: sk, type: type })
}

export async function getInvoicesByCustomer(customer: string) {
    const queryResult = await getBySKAndType(customer, 'invoice')
    return mapInvoices(queryResult?.data?.items);
}

async function getByPK(pk: string) {
    return await client.queries.getByPK({ pk: pk })
}

//this returns all entries for a invoice with pk {invoice} regardless of type
//TODO consider typing for composite
export async function getSingleInvoiceInfo(invoice: string) {
    return await getByPK(invoice);
}

export async function addCustomer(
    pk: string,
    sk: string,
    birthdate: string | null,
    email: string | null,
    gender: string | null,
    name: string | null,
    phone: string | null,
): Promise<Customer> {
    const response = await client.mutations.addCustomer({
        pk: pk,
        sk: sk,
        birthdate: birthdate,
        email: email,
        gender: gender,
        name: name,
        phone: phone,
    });
    return mapToCustomer(response?.data);
}

export async function addProduct(
    pk: string,
    sk: string,
    category: string,
    name: string | null,
    price: string | null,
    quantity: number | null,
): Promise<Product> {
    const response = await client.mutations.addProduct({
        pk: pk,
        sk: sk,
        category: category,
        name: name,
        price: price,
        quantity: quantity,
    });
    return mapToProduct(response?.data);
}

async function deleteByPKandSK(pk: string, sk: string) {
    return await client.mutations.deleteByPKandSK({ pk: pk, sk: sk })
}

async function deleteByPKandType(pk: string, type: string) {
    return await client.mutations.deleteByPKandType({ pk: pk, type: type })
}

export async function deleteCustomer(customer: string): Promise<Customer> {
    const queryResult = await deleteByPKandSK(customer, customer);
    return mapToCustomer(queryResult?.data);
}

export async function deleteProduct(product: string): Promise<Product> {
    const queryResult = await deleteByPKandSK(product, product);
    return mapToProduct(queryResult?.data);
}

export async function deleteInvoice(invoice: string): Promise<{ invoice: Invoice, invoiceProducts: InvoiceProduct[] }> {
    const invoiceResult = await deleteByPKandSK(invoice, invoice);
    const invoiceProducts = await deleteByPKandType(invoice, 'invoice_product');
    return {
        invoice: mapToInvoice(invoiceResult?.data),
        invoiceProducts: mapInvoiceProducts(invoiceProducts?.data)
    };
}