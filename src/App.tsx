import { Authenticator, CheckboxField } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Button } from "./shadcn/components/ui/button";
import {Routing} from "@/pages/Routing.tsx";
import {BrowserRouter} from "react-router-dom";
import {
    // getCustomers,
    // getInvoices,
    // getInvoicesByCustomer, getProduct,
    // getProductsByCategory, getSingleInvoiceInfo,
    // scan,
    addCustomer,
    addProduct,
    addInvoice,
    addInvoiceProduct,
    deleteCustomer,
    deleteProduct,
    deleteInvoice,
    deleteInvoiceProductPKandSK,
    deleteInvoiceProductSKandType,
    updateCustomer,
    // updateInvoice,
    // updateProduct,
    // updateInvoiceProduct
} from "../amplify/utils/queryUtils.ts";

function App() {
 // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);


  return (
    <Authenticator
      className='mt-10'
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                <Authenticator.SignUp.FormFields />
                {/* Append & require Terms and Conditions field to sign up  */}
                <CheckboxField
                  name="custom:owner"
                  value="true"
                  label="Owner"
                />
              </>
            );
          },
        },
      }}>
      {({ signOut, user }) => {
        // print the user
        console.log(user)
        // Return the JSX
        return (
            <>
                <BrowserRouter>
                    <Routing/>
                </BrowserRouter>
                {/* <Button onClick={async () => console.log(await getProduct('p#11111129'))}>Get Product</Button>
                <Button onClick={async () => console.log(await getCustomers())}>Get Customers</Button>
                <Button onClick={async () => console.log(await getProductsByCategory('Category 1'))}>Get Products by Category</Button>
                <Button onClick={async () => console.log(await getInvoices())}>Get Invoices</Button>
                <Button onClick={async () => console.log(await scan())}>Scen</Button>
                <Button onClick={async () => console.log(await getInvoicesByCustomer('c#11111126'))}>Get Invoices by Customer</Button>
                <Button onClick={async () => console.log(await getSingleInvoiceInfo('i#11111132'))}>Get Single Invoice Info</Button> */}

                <Button onClick={async () => console.log(await addCustomer('c#99887766', 'c#99887766', 'definitely a date', 'test_user@email.com', 'attack helicopter', 'Major Major Major'))}>Create new customer</Button>
                <Button onClick={async () => console.log(await addInvoice('i#99887766', 'c#99887766', 'definitely a date'))}>Create invoice for current date</Button>
                <Button onClick={async () => console.log(await addProduct('p#99887766', 'p#99887766', 'Category 1', 'Test product 99887766', '6.66', 420))}>Create new product 1</Button>
                <Button onClick={async () => console.log(await addProduct('p#99887755', 'p#99887755', 'Category 2', 'Test product 99887755', '9.87', 1))}>Create new product 2</Button>
                <Button onClick={async () => console.log(await addProduct('p#99887744', 'p#99887744', 'Category 3', 'Test product 99887744', '420.69', 2))}>Create new product 3</Button>
                <Button onClick={async () => console.log(await addInvoiceProduct('i#99887766', 'p#99887766', 1))}>Create new invoice product 1</Button>
                <Button onClick={async () => console.log(await addInvoiceProduct('i#99887766', 'p#99887755', 1))}>Create new invoice product 2</Button>

                <Button onClick={async () => console.log(await updateCustomer('c#99887766', 'c#99887766', 'definitely not a date', 'real_email@email.com', 'defense helicopter', 'Big Chungus'))}>Update customer</Button>
                {/* <Button onClick={async () => console.log(await updateInvoice('i#99887766', 'c#99887766', 'definitely not a date'))}>Update invoice</Button>
                <Button onClick={async () => console.log(await updateProduct('p#99887766', 'p#99887766', 'Category 1', 'Updated test product 99887766', '1.11', 111))}>Update product 1</Button>
                <Button onClick={async () => console.log(await updateInvoiceProduct('i#99887766', 'p#99887766', 2))}>Update invoice product 1</Button> */}

                <Button onClick={async () => console.log(await deleteInvoice('i#99887766', 'c#99887766'))}>Delete invoice</Button>
                <Button onClick={async () => console.log(await deleteInvoiceProductPKandSK('i#99887766', 'p#99887766'))}>Delete invoice products using PK and SK</Button>
                <Button onClick={async () => console.log(await deleteInvoiceProductSKandType('p#99887755'))}>Delete invoice products using SK and type</Button>
                <Button onClick={async () => console.log(await deleteProduct('p#99887766'))}>Delete product 1</Button>
                <Button onClick={async () => console.log(await deleteProduct('p#99887755'))}>Delete product 2</Button>
                <Button onClick={async () => console.log(await deleteProduct('p#99887744'))}>Delete product 3</Button>
                <Button onClick={async () => console.log(await deleteCustomer('c#99887766'))}>Delete customer</Button>
                <Button onClick={signOut}>Log Out</Button>
            </>
        );
      }}
    </Authenticator>
  );
}

export default App;
