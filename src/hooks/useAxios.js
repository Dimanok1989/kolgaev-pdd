'use client';

import Axios from "axios";

export default function useAxios() {

    let headers = {
        'Accept': "application/json",
        'X-Requested-With': "XMLHttpRequest",
    };

    const axios = Axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_SERVER,
        headers,
    });

    // axios.defaults.withCredentials = true;

    axios.interceptors.request.use((config) => {

        const token = localStorage.getItem('pdd_session_id');

        config.headers = {
            ...config.headers,
            'X-Pdd-Session-Id': token
        }

        return config;
    });

    axios.interceptors.response.use(
        (response) => {
            if (response.headers) {
                let pddSessionId = response.headers.get('x-pdd-session-id');
                if (pddSessionId) {
                    localStorage.setItem('pdd_session_id', pddSessionId);
                }
            }
            return response;
        },
    );

    return { axios };
}
