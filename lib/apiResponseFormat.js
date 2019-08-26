export const response_200 = body => ({ status: 200, body: { success: true, message: body } });

export const response_400 = error => ({ status: 400, body: { success: false, message: error } });

export const response_500 = (message, error) => ({ status: 500, body: { success: false, message, error } });

export function setResponse(response, data) {
    const { body, status } = data;
    response.body = body;
    response.status = status;
}
