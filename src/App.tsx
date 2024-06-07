import { Authenticator, CheckboxField } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Button } from "./shadcn/components/ui/button";

//const client = generateClient<Schema>();

function App() {
 // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);


  return (
    <Authenticator
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
          <main>
            <Button onClick={signOut}>Sign out</Button>
          </main>
        );
      }}
    </Authenticator>
  );
}

export default App;
