import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'ToyShop/v1.0'
    },
    validateStatus: (status) => {
        return status === 200 || status === 204
    }
})

export class MainService {
    static async login(username: string, password: string) {
        return await client.request({
            url: '/user/login',
            method: 'post',
            data: {
                username, password
            }
        })
    }

    static async useAxios(url: string, method: string = 'get', body: object = {}) {
        let rsp: AxiosResponse

        try {
            rsp = await client.request({
                url: url,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthService.getAccessToken()}`
                },
                data: body
            }) as AxiosResponse
        } catch (e: any) {
            rsp = (e as AxiosError).response as AxiosResponse
        }

        if (rsp == undefined) {
            throw new Error('CONNECTION_ISSUES')
        }

        if (rsp.status == 403) {
            try {
                const tokenReq = await client.request({
                    url: '/user/refresh',
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${AuthService.getRefreshToken()}`
                    }
                })

                AuthService.saveAuth(tokenReq.data)

                rsp = await client.request({
                    url: url,
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${AuthService.getAccessToken()}`
                    },
                    data: body
                })
            } catch (e) {
                // AuthService.removeAuth()
                throw new Error('REFRESH_FAILED')
            }
        }

        if (rsp.status == 404) {
            throw new Error('NOT_FOUND')
        }

        return rsp
    }
}