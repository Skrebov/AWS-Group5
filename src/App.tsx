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
    addItem,
    addCustomer,
    addProduct,
    addInvoice,
    addInvoiceProduct,
    deleteCustomer,
    deleteProduct,
    deleteInvoice,
} from "../amplify/utils/queryUtils.ts";

const currentDate = new Date();

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

                <Button onClick={async () => console.log(await ('c#99887766', 'c#99887766', currentDate.toString(), 'test_user@email.com', 'attack helicopter', 'Major Major Major', null))}>Create new customer</Button>


                <Button onClick={async () => console.log(await addCustomer('c#99887766', 'c#99887766', currentDate.toString(), 'test_user@email.com', 'attack helicopter', 'Major Major Major', null))}>Create new customer</Button>
                <Button onClick={async () => console.log(await addInvoice('i#99887766', 'c#99887766', currentDate.toDateString()))}>Create invoice for current date</Button>
                <Button onClick={async () => console.log(await addProduct('p#99887766', 'p#99887766', 'Category 1', 'Test product 99887766', '6.66', 420))}>Create new product 1</Button>
                <Button onClick={async () => console.log(await addProduct('p#99887755', 'p#99887755', 'Category 2', 'Test product 99887755', '9.87', 1))}>Create new product 2</Button>
                <Button onClick={async () => console.log(await addProduct('p#99887744', 'p#99887744', 'Category 3', 'Test product 99887744', '420.69', 2))}>Create new product 3</Button>
                <Button onClick={async () => console.log(await addInvoiceProduct('i#99887766', 'p#99887766', 1))}>Create new invoice product 1</Button>
                <Button onClick={async () => console.log(await addInvoiceProduct('i#99887766', 'p#99887755', 1))}>Create new invoice product 2</Button>
                <Button onClick={async () => console.log(await addInvoiceProduct('i#99887766', 'p#99887744', 1))}>Create new invoice product 3</Button>
                <Button onClick={async () => console.log(await deleteInvoice('i#99887766'))}>Delete invoice and invoice products</Button>
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
