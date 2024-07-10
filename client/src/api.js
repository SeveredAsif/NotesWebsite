import axios from 'axios';

const API_URL = 'http://localhost:4000/notes';

export const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('There was an error fetching the notes!', error);
    throw error;
  }
};

export const addNote = async (note) => {
  try {
    const response = await axios.post(API_URL, { note });
    return response.data;
  } catch (error) {
    console.error('There was an error adding the note!', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('There was an error deleting the note!', error);
    throw error;
  }
};
