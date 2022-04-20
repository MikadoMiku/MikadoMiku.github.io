import { IFetchResponse } from "@/types/IFetchResponse";
import { IJwt } from "@/types/IJwt";
import { IMessage } from "@/types/IMessage";
import axios from "axios";

export default class AccountService {
    private url = "";
    constructor(protected apiEndpointUrl: string) {
        this.url = apiEndpointUrl;
    }

    async login(
        email: string,
        password: string
    ): Promise<IFetchResponse<IJwt | IMessage>> {
        const url = this.url;

        try {
            const urlBody = { email, password };
            const response = await axios.post(url, JSON.stringify(urlBody), {
                headers: {
                    "Content-Type": " application/json",
                },
            });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}
