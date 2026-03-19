import type { AuthModel } from "@/models/auth.model";

const AUTH_KEY = 'rs_2026_auth'

export class AuthService {
    static saveAuth(auth: AuthModel) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
    }

    static hasAuth() {
        return localStorage.getItem(AUTH_KEY) != null
    }

    static removeAuth() {
        localStorage.removeItem(AUTH_KEY)
    }

    static getAuth(): AuthModel {
        const auth = localStorage.getItem(AUTH_KEY)

        if (auth == null)
            throw new Error('NO_AUTH')
        return JSON.parse(auth)
    }

    static getAccessToken() {
        return this.getAuth().access
    }

    static getRefreshToken() {
        return this.getAuth().refresh
    }
}