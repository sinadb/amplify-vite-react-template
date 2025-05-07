import ReactDOM from "react-dom/client";

import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import {cognitoUserPoolsTokenProvider} from 'aws-amplify/auth/cognito'



Amplify.configure(
    outputs

);









// const formFields = {
//
//     signIn: {
//         mfaCode : {
//             label : 'code',
//             placeholder: 'enter code',
//             isRequired: false,
//         },
//         password: {
//             label: 'Password',
//             placeholder: 'Enter your password',
//             isRequired: true,
//         },
//
//     },
//
//     signUp : {
//
//         password: {
//             label: 'Password',
//             placeholder: 'Enter your password',
//             isRequired: true,
//         },
//
//     }
// }


import {CookieStorage} from 'aws-amplify/utils'
import React from "react";

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({
    domain: 'localhost',  // Replace with your domain
    path: '/',
    expires: 365,
    sameSite:'lax',
    secure: false
    // Set to true if using HTTPS
}));
// async function currentSession() {
//     try {
//         const {tokens} = await fetchAuthSession();
//
//         return tokens;
//     }catch(error) {
//         console.error(error);
//     }
// }
import {generateClient} from "aws-amplify/data";
import {Schema} from "../amplify/data/resource.ts";

const client = generateClient<Schema>()

// type Todo = Schema['Todo']['type']
//
// async function createTodo() {
//     await client.models.Todo.create({
//         content: window.prompt("Todo content?")
//
//
//
//     })
// }

async function createRandomTable() {
    await client.models.RandomTable.create({
        name: window.prompt("What is the name?"),
        age: window.prompt("What is the age?")

    })
}

// // @ts-ignore
// async function createToDoTable(){
//     await client.models.Todo.create({
//         content: window.prompt("What is the name?"),
//         isDone: false
//     })
// }






function Main() {
//
// async function fetchTodos() {
//     client.models.Todo.observeQuery().subscribe({
//         next: ({items, isSynced}) => {
//                 setTodos(items);
//
//         }
//     })
// }

    // useEffect(() => {
    //     fetchTodos()
    // }, []);

    return (


        // <ul>
        //     {todos.map((item, index) => (
        //         <li>
        //             {item.content}
        //         </li>
        //     ))}
        // </ul>
        //<Authenticator services={services} initialState="signUp" formFields={formFields}>
            <button onClick={createRandomTable}>"SignOut"</button>




    )
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>
);
