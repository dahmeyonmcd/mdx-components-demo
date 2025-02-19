let environment = 'PROD' //process.env.NEXT_PUBLIC_ENVIRONMENT || 'PROD';

export const APIBaseURL = environment === 'DEV' ? 'http://localhost:8000/api/' : 'https://api.mdxcrypto.com/v1/';

const CLIENT_ID = 'mdx-portal'
const API_KEY = 'c54cccd2-8239-4157-9156-a7538d6017ea'

const NetworkingAPI = {

    async fetchDataFullResponse(url: string, method = 'GET', requestBody?: any, bearerToken?: string) {
        let formattedURL = APIBaseURL + url

        try {
            let options;

            if (requestBody) {
                options = {
                    method: method,
                    headers: {
                        'origin': '*',
                        'x-requested-with': '*',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearerToken}`,
                        'x-client-id': CLIENT_ID,
                        'x-api-key': API_KEY,
                    },
                    body: JSON.stringify(requestBody)
                }
            } else {
                options = {
                    method: method,
                    headers: {
                        'origin': '*',
                        'x-requested-with': '*',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearerToken}`,
                        'x-client-id': CLIENT_ID,
                        'x-api-key': API_KEY,
                    }
                };
            }


            // @ts-ignore
            const response = await fetch(formattedURL, options);

            return {
                response: await response.json(),
                status: response.status,
            };
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    },

};

export default NetworkingAPI;
