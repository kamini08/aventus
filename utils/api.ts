import axios from 'axios';

export const askLLM = async (prompt: string): Promise<string> => {
  try {
    const res = await axios.post('http://localhost:5000/ask', { prompt });
    return res.data.response;
  } catch (err) {
    console.error(err);
    return "Error fetching response";
  }
};
