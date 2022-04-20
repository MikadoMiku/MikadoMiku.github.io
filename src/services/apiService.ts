import { IFetchResponse } from "../types/IFetchResponse";
import { IQueryParams } from "../types/IQueryParams";
import axios from "axios";

export default class BaseService<TEntity> {
    private authHeaders: any;
    constructor(protected apiEndpointUrl: string, protected jwt?: string) {
        this.authHeaders =
            this.jwt !== undefined
                ? {
                    "Content-Type": " application/json",
                    "x-access-token": this.jwt,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                }
                : {
                    "Content-Type": " application/json",
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                };
    }

    async getAll(
        queryParams?: IQueryParams
    ): Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            if (queryParams.action !== undefined) {
                url = url + "/" + queryParams.action;
            }
            if (queryParams.id !== undefined) {
                url = url + "/" + queryParams.id;
            }
            if (queryParams.culture !== undefined) {
                url = url + "?culture=" + queryParams.culture;
            }
        }

        try {
            const response = await axios.get(url, {
                headers: this.authHeaders,
            });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity[],
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

    async get(
        id: string,
        queryParams?: IQueryParams
    ): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        if (queryParams !== undefined) {
            if (queryParams.action !== undefined) {
                url = url + "/" + queryParams.action;
            }
        }
        url = url + "/" + id;
        try {
            const response = await axios.get(url, {
                headers: this.authHeaders,
            });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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

    async put(
        entity: TEntity,
        id: string,
        queryParams?: IQueryParams
    ): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            if (queryParams.action !== undefined) {
                url = url + "/" + queryParams.action;
            }
        }
        url = url + "/" + id;
        const entityStr = JSON.stringify(entity);
        try {
            const response = await axios.put(url, entityStr, {
                headers: this.authHeaders,
            });
            if (
                (response.status >= 200 && response.status < 300) ||
                response.status === 0
            ) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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

    async post(
        entity: any,
        queryParams?: IQueryParams
    ): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        if (queryParams !== undefined) {
            if (queryParams.action !== undefined) {
                url = url + "/" + queryParams.action;
            }
        }

        try {
            const response = await axios.post(url, entity, {
                headers: this.authHeaders,
            });
            if (
                (response.status >= 200 && response.status < 300) ||
                response.status === 0
            ) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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

    async delete(
        id: string,
        queryParams?: IQueryParams
    ): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        if (queryParams !== undefined) {
            if (queryParams.action !== undefined) {
                url = url + "/" + queryParams.action;
            }
        }
        url = url + "/" + id;

        try {
            const response = await axios.delete(url, {
                headers: this.authHeaders,
            });
            if (
                (response.status >= 200 && response.status < 300) ||
                response.status === 0
            ) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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
