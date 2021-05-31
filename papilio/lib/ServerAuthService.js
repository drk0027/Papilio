import "./Vars"

import decode from 'jwt-decode';
import Cookies from 'js-cookie';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = global.server // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }
    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}api/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            if (res.error !== undefined) {
                console.log(res.error)
            }
            if (res.success !== undefined) {
                this.setToken(res.success.accessToken) // Setting the token in localStorage
                this.setCookieToken(res.success.accessToken) //Guardando el token en las cookies
                this.setName(res.success.username) // Setting the token in localStorage
                this.setEmail(res.success.email) // Setting the token in localStorage
            }

            return Promise.resolve(res);
        })
    }
    register(username, email, password, c_password) {
        return this.fetch(`${this.domain}api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
                c_password
            })
        }).then(res => {
            //console.log(res.success.token);
            //this.setToken(res.success.token) // Setting the token in localStorage
            //this.setName(res.success.name) // Setting the token in localStorage
            //this.setEmail(res.success.email) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }
    loggedIn() {
        //console.log(req)
        //si el llamado se hace con un req null, entonces viene de un cliente, por lo tanto, usara el local storage, caso contrario, usara las cookies
        console.log("cliente")
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here


    }
    ServerloggedIn(req) {
        console.log(req)
        //si el llamado se hace con un req null, entonces viene de un cliente, por lo tanto, usara el local storage, caso contrario, usara las cookies

        //console.log("servidor")
        const token = this.getCookieToken(req)
        //console.log(token)
        return !!token && !this.isTokenExpired(token)
        //del lado del servidor, debe obtener las cookies

    }
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }
    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }
    setCookieToken(idToken) {
        Cookies.set("id_token", idToken)
    }
    setEmail(Email) {
        // Saves user token to localStorage
        localStorage.setItem('email', Email)
    }
    setName(Name) {
        // Saves user token to localStorage
        localStorage.setItem('name', Name)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }
    getCookieToken(req) {
        //console.log("aqui es getCookieToken")
        //console.log(req.headers)
        let token = ""
        //console.log(req.headers.cookie == undefined)
        if (req.headers.cookie == undefined) {
            return false
        } else {
            const cookieItems = req.headers.cookie.split(";")
            cookieItems.map(resp => {
                //console.log(resp.split("="))
                if (resp.split("=")[0] == "id_token") {
                    token = resp.split("=")[1]

                }
            })
            return token

        }

    }
    getEmail() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('email')
    }
    getName() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('name')
    }
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
    }
    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    fetch_img(url, options) {
        // performs api calls sending the required authentication headers
        //console.log(url);
        //console.log(options);
        const headers = {

        }
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['x-access-token'] = this.getToken()
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        //console.log(url);
        //console.log(options);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['x-access-token'] = this.getToken()
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }
    ServerFetch(url, options, req) {
        // performs api calls sending the required authentication headers
        //console.log("si pasa por el serverfetch")
        //console.log(req)
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.ServerloggedIn(req)) {
            headers['x-access-token'] = this.getCookieToken(req)
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }
    _checkStatus(response) {
        //console.log(response);
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 402) { // Success status lies between 200 to 300
            return response
        } else {
            //return response
            console.log(response.statusText);
            var error = new Error(response.statusText)
            error.response = response
            alert(response.statusText)
            //throw error
        }
    }
}