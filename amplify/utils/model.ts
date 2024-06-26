
export type Customer =  {
    birthdate: string;
    email: string;
    gender: string;
    name: string;
    phone: string;
    pk: string;
    sk: string;
};


export type Product  =  {
    category: string;
    name: string;
    pk: string;
    sk: string;
    price: string;
    quantity: number;
};

export type ProductPaginationType = {
    products: Product[];
    nextToken: string,
}

export type CustomerPaginationType = {
    customers: Customer[];
    nextToken: string,
}

export type InvoicePaginationType = {
    invoices: RecentPurchase[];
    nextToken: string,
}


export type Invoice  =  {
    date: string;
    pk: string;
    sk: string;
};

export type InvoiceProduct = {
    pk: string;
    sk: string;
    quantity: number;
    product?: Product;
    type: string;
};


export type DataItem =  {
    name: string;
    total: number;
}

export type RecentPurchase = {
    pk: string,
    date: string,
    customerName: string,
    email: string,
    totalAmount: number,
    type: string
}