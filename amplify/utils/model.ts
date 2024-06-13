
export type Customer = {
    pk: string;
    sk: string;
    birthdate: string;
    email: string;
    gender: string;
    name: string;
    phone: string;
};


export type Product = {
    pk: string;
    sk: string;
    category: string;
    name: string;
    price: string;
    quantity: number;
};

export type Invoice = {
    pk: string;
    sk: string;
    date: string;
};

export type InvoiceProduct = {
    pk: string;
    sk: string;
    quantity: number;
};