const BASE_URL = 'https://fakestoreapi.com';

class ApiClient {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${BASE_URL}${endpoint}`;

        try {
            const res = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            })

            if (!res.ok) throw new Error(`Error! Status: ${res.status}`);

            return res.json();
        } catch (e) {
            throw e;
        }
    }


    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint);
    }

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        })
    }
}

export const apiClient = new ApiClient();