import ReactDOM from "react-dom/client";

import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import {Authenticator} from '@aws-amplify/ui-react'
import {cognitoUserPoolsTokenProvider} from 'aws-amplify/auth/cognito'



Amplify.configure(
    outputs

);


// import {setUpTOTP} from 'aws-amplify/auth'
// const totpSetupDetails = await setUpTOTP()
// const app_name = "my_app"
// const setupUri = totpSetupDetails.getSetupUri(app_name)

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");





import {signUp, SignUpInput} from '@aws-amplify/auth'
import {signIn, SignInInput, } from '@aws-amplify/auth'
import {signOut} from '@aws-amplify/auth'

const formFields = {

    signIn: {
        mfaCode : {
            label : 'code',
            placeholder: 'enter code',
            isRequired: false,
        },
        password: {
            label: 'Password',
            placeholder: 'Enter your password',
            isRequired: true,
        },

    },

    signUp : {

        password: {
            label: 'Password',
            placeholder: 'Enter your password',
            isRequired: true,
        },

    }
}


import {fetchAuthSession} from '@aws-amplify/auth'
import {CookieStorage} from 'aws-amplify/utils'

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({
    domain: 'localhost',  // Replace with your domain
    path: '/',
    expires: 365,
    sameSite:'lax',
    secure: false
    // Set to true if using HTTPS
}));
async function currentSession() {
    try {
        const {tokens} = await fetchAuthSession();

        return tokens;
    }catch(error) {
        console.error(error);
    }
}


const services = {
    async handleSignIn(input: SignInInput) {
        const {username, password} = input;
        const {nextStep} = await signIn({
            username: username,
            password: password
        })
        console.log(nextStep.signInStep)
        const tokens = await currentSession()
        console.log("session tokens are : ", tokens);


        return {
            isAuthenticated: true,
            nextStep,
        }




    },


    async handleSignUp(input: SignUpInput) {
        // custom username and email
        const { username, password, options } = input;
        const customUsername = username.toLowerCase();
        const customEmail = options?.userAttributes?.email?.toLowerCase();
        return signUp({
            username: customUsername,
            password,
            options: {
                ...input.options,
                userAttributes: {
                    ...input.options?.userAttributes,
                    email: customEmail,
                },
            },
        });
    }
}







function Main() {


    return (


        <Authenticator services={services} initialState="signUp" formFields={formFields}>
            <button onClick={signOut}>"SignOut"</button>

         </Authenticator>

    )
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>
);
