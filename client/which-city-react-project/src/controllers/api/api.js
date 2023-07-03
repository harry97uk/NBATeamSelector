import axios from 'axios'

export async function handleAPIRequest(url, options) {
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('API request failed');
    }
  }