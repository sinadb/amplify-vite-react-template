import React, {FormEvent} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react'
import {useState} from "react";

Amplify.configure(outputs);

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

interface SignInFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
    readonly elements: SignInFormElements;
}

import {signUp, SignUpInput} from '@aws-amplify/auth'
import {signIn, signInInput, confirmSignIn} from '@aws-amplify/auth'

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




const services = {
    async handleSignIn(input: signInInput) {
        const {username, password} = input;
        return  await signIn({
            username: username,
            password: password
        })




    },


    async handleSignUp(input: SignUpInput) {
        // custom username and email
        const { username, password, options } = input;
        const customUsername = username.toLowerCase();
        const customEmail = options?.userAttributes?.email.toLowerCase();
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

// const signUpServices = {
//
// }



function Main() {

    return (

        <Authenticator services={services} initialState="signUp" formFields={formFields}>
            {({ signOut }) => <button onClick={signOut}>Sign out</button>}
        </Authenticator>
    )
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>
);
