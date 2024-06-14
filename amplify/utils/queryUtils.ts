import { generateClient } from "aws-amplify/api";
import { Schema } from "../data/resource";
import { Customer, Product, Invoice, InvoiceProduct } from "./model";
import { mapCustomers, mapInvoices, mapProducts, mapToCustomer, mapToProduct, mapToInvoice, mapToInvoiceProduct } from "./mapper";

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
    birthdate?: string,
    email?: string,
    gender?: string,
    name?: string,
    phone?: string,
): Promise<Customer> {
    const response = await client.mutations.addCustomer({
        pk: pk,
        sk: sk,
        type: 'customer',
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
    category?: string,
    name?: string,
    price?: string,
    quantity?: number,
): Promise<Product> {
    const response = await client.mutations.addProduct({
        pk: pk,
        sk: sk,
        type: 'product',
        category: category,
        name: name,
        price: price,
        quantity: quantity,
    });
    return mapToProduct(response?.data);
}

export async function addInvoice(
    pk: string,
    sk: string,
    date?: string,
): Promise<Invoice> {
    const response = await client.mutations.addInvoice({
        pk: pk,
        sk: sk,
        type: 'invoice',
        date: date,
    });
    return mapToInvoice(response?.data);
}

export async function addInvoiceProduct(
    pk: string,
    sk: string,
    quantity: number,
): Promise<InvoiceProduct> {
    const response = await client.mutations.addInvoiceProduct({
        pk: pk,
        sk: sk,
        type: 'invoice_product',
        quantity: quantity,
    });
    return mapToInvoiceProduct(response?.data);
}

async function deleteByPKandSK(pk: string, sk: string) {
    return await client.mutations.deleteByPKandSK({ pk: pk, sk: sk })
}

async function deleteBySKandType(sk: string, type: string) {
    return await client.mutations.deleteBySKandType({ sk: sk, type: type })
}

export async function deleteCustomer(customer: string): Promise<Customer> {
    const queryResult = await deleteByPKandSK(customer, customer);
    return mapToCustomer(queryResult?.data);
}

export async function deleteProduct(product: string): Promise<Product> {
    const queryResult = await deleteByPKandSK(product, product);
    return mapToProduct(queryResult?.data);
}

export async function deleteInvoice(invoice: string, customer: string): Promise<Invoice>{
    const queryResult = await deleteByPKandSK(invoice, customer);
    return mapToInvoice(queryResult?.data);
}

export async function deleteInvoiceProductPKandSK(invoice: string, product: string): Promise<InvoiceProduct>{
    const queryResult = await deleteByPKandSK(invoice, product);
    return mapToInvoiceProduct(queryResult?.data);
}

export async function deleteInvoiceProductSKandType(product: string): Promise<InvoiceProduct>{
    const queryResult = await deleteBySKandType(product, 'invoice_product');
    return mapToInvoiceProduct(queryResult?.data);
}

export async function updateInvoiceProduct(
    pk: string,
    sk: string,
    quantity?: number,
): Promise<InvoiceProduct> {
    const response = await client.mutations.updateInvoiceProduct({
        pk: pk,
        sk: sk,
        type: 'invoice_product',
        quantity: quantity,
    });
    return mapToInvoiceProduct(response?.data);
}

export async function updateProduct(
    pk: string,
    sk: string,
    category?: string,
    name?: string,
    price?: string,
    quantity?: number,
) {
    const response = await client.mutations.updateProduct({
        pk: pk,
        sk: sk,
        type: 'product',
        category: category,
        name: name,
        price: price,
        quantity: quantity,
    });
    return mapToProduct(response?.data);
}

export async function updateInvoice(
    pk: string,
    sk: string,
    date?: string,
): Promise<Invoice> {
    const response = await client.mutations.updateInvoice({
        pk: pk,
        sk: sk,
        type: 'invoice',
        date: date,
    });
    return mapToInvoice(response?.data);
}

export async function updateCustomer(
    pk: string,
    sk: string,
    birthdate?: string,
    email?: string,
    gender?: string,
    name?: string,
    phone?: string,
): Promise<Customer> {
    const response = await client.mutations.updateCustomer({
        pk: pk,
        sk: sk,
        type: 'customer',
        birthdate: birthdate,
        email: email,
        gender: gender,
        name: name,
        phone: phone,
    });
    return mapToCustomer(response?.data);
}
