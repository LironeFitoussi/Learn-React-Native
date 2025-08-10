// firebase
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

async function authenticate(mode: string, email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, { 
        email, 
        password, 
        returnSecureToken: true 
    });

    // console.log("Authenticate response:", response.data);
    const token = response.data.idToken;
    return token;
}

async function createUser(email: string, password: string) {
    return authenticate("signUp", email, password);
}

async function login(email: string, password: string) {
    return authenticate("signInWithPassword", email, password);
}

export { createUser, login };

