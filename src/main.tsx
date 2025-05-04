import React, {FormEvent} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react'
import {signIn} from 'aws-amplify/auth'
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

const formFields = {

    signIn: {

    }
    signUp : {
        username: {
            label: 'Username',
            placeholder : 'Enter your username',
            isRequired: true,
        },
        password: {
            label: 'Password',
            placeholder: 'Enter your password',
            isRequired: true,
        },
        email: {
            label: 'Email',
            placeholder: 'Enter your email',
            isRequired: true,
        }
    }
}

const signUpServices = {
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
    },
}



function Main() {
    return (
        <Authenticator services={signUpServices} initialState="signUp" formFields={formFields}>
            {({ signOut }) => <button onClick={signOut}>Sign out</button>}
        </Authenticator>
    )
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>
);
