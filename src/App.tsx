import '@aws-amplify/ui-react/styles.css'
import AppRouter from "@/pages/Routing.tsx"

import AppProvider from "@/pages/app-provider.tsx";


function App() {
 // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);


  // return (
  //   <Authenticator
  //     className='mt-10'
  //     components={{
  //       SignUp: {
  //         FormFields() {
  //           return (
  //             <>
  //               {/* Re-use default `Authenticator.SignUp.FormFields` */}
  //               <Authenticator.SignUp.FormFields />
  //               {/* Append & require Terms and Conditions field to sign up  */}
  //               <CheckboxField
  //                 name="custom:owner"
  //                 value="true"
  //                 label="Owner"
  //               />
  //             </>
  //           );
  //         },
  //       },
  //     }}>
  //     {({ signOut, user }) => {
  //       // print the user
  //       console.log(user)
  //       // Return the JSX
        return (
            <>
               <AppProvider>
                   <AppRouter></AppRouter>
               </AppProvider>
            </>
        );
    //   //     }}
    //   //   </Authenticator>
    //   // );
}

export default App;
