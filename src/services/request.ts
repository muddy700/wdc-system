import axios from "axios";
import jwt from 'jsonwebtoken';
import { constants } from "../config/constants";

//const { TIGER_GATEWAY_BASE_URL, TIGER_API_SECRET } = constants;
const TIGER_GATEWAY_BASE_URL='';
const TIGER_API_SECRET='';

export const get = async (uri: string, queryParam: string) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'jwt-token': jwt.sign(queryParam, TIGER_API_SECRET)
        }
    };

    const response = await axios.get(
        `${TIGER_GATEWAY_BASE_URL}/${uri}`,
        requestOptions
    );

    return response.data;
}

export const post = async (uri: string, payload: any) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'jwt-token': jwt.sign(payload, TIGER_API_SECRET)
        }
    };

    const response = await axios.post(
        `${TIGER_GATEWAY_BASE_URL}/${uri}`,
        payload,
        requestOptions
    );
    console.log(`${TIGER_GATEWAY_BASE_URL}/${uri}`);
    console.log(response.data);
    return response.data;
}

export const _delete = async (uri: string, payload: any) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'jwt-token': jwt.sign(payload, TIGER_API_SECRET)
        },
        data: payload
    };

    const response = await axios.delete(
        `${TIGER_GATEWAY_BASE_URL}/${uri}`,
        requestOptions
    );

    return response.data;
}