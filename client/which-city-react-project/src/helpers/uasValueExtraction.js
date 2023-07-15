export function extractFloatValueFromResponse(response, categoryId, dataId) {
    return response?.data.categories.find((v) => v.id === categoryId)?.data.find((v) => v.id === dataId)?.float_value;
}

export function extractStringValueFromResponse(response, categoryId, dataId) {
    return response?.data.categories.find((v) => v.id === categoryId)?.data.find((v) => v.id === dataId)?.string_value;
}

export function extractDollarValueFromResponse(response, categoryId, dataId) {
    return response?.data.categories.find((v) => v.id === categoryId)?.data.find((v) => v.id === dataId)?.currency_dollar_value;
}

