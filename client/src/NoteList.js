import React, { useEffect, useState } from "react";
import { getNotes, addNote, deleteNote } from "./api";
import "./NoteList.css"; // Import the CSS file

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes();
        //console.log(notesData);
        setNotes(notesData);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      const noteData = await addNote(newNote);
      setNotes([
        ...notes,
        {
          id: noteData.data.id,
          note: newNote,
          time: Math.floor(Date.now() / 1000),
        },
      ]);
      setNewNote("");
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.note} (created at:{" "}
            {new Date(note.time * 1000).toLocaleString()})
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <form>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="add-note-btn" onClick={handleAddNote}>
          Add Note
        </button>
        </form>
      </div>
    </div>
  );
};

export default NotesList;
