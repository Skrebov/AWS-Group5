import { Authenticator, CheckboxField } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Button } from "./shadcn/components/ui/button";
import {Routing} from "@/pages/Routing.tsx";
import {BrowserRouter} from "react-router-dom";
import {
    getCustomers,
    getInvoices,
    getInvoicesByCustomer, getProduct,
    getProductsByCategory, getSingleInvoiceInfo,
    scan
} from "../amplify/utils/utils.ts";


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
                <Button onClick={async () => console.log(await getProduct('p#11111129'))}>Get Product</Button>
                <Button onClick={async () => console.log(await getCustomers())}>Get Customers</Button>
                <Button onClick={async () => console.log(await getProductsByCategory('Category 1'))}>Get Products by Category</Button>
                <Button onClick={async () => console.log(await getInvoices())}>Get Invoices</Button>
                <Button onClick={async () => console.log(await scan())}>Scen</Button>
                <Button onClick={async () => console.log(await getInvoicesByCustomer('c#11111126'))}>Get Invoices by Customer</Button>
                <Button onClick={async () => console.log(await getSingleInvoiceInfo('i#11111132'))}>Get Single Invoice Info</Button>
                <Button onClick={signOut}>Log Out</Button>
            </>
        );
      }}
    </Authenticator>
  );
}

export default App;
