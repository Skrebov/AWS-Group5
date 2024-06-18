import '@aws-amplify/ui-react/styles.css'
import AppRouter from "@/pages/Routing.tsx"

import AppProvider from "@/pages/app-provider.tsx";
import {Authenticator, CheckboxField} from "@aws-amplify/ui-react";
import {AuthProvider} from "@/pages/auth-provider.tsx";


function App() {
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
                <AuthProvider signOut={signOut}>
                    <AppProvider>
                        <AppRouter></AppRouter>
                    </AppProvider>
                </AuthProvider>
            </>
        );
          }}
        </Authenticator>
      );
}

export default App;
