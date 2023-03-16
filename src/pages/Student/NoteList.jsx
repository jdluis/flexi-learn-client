import React, { useEffect, useState } from "react";
import AddNote from "../../components/AddNote";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

import {
  getAllNotesService,
  deleteNoteService,
  editNoteService,
} from "../../services/notes.services.js";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("pendient");
  const [isFetching, setIsFetching] = useState(true);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    editNote(e.target.getAttribute("noteId"));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pendient":
        return "orange";
      case "process":
        return "blue";
      case "done":
        return "green";
    }
  };

  useEffect(() => {
    getNotes();
  }, [status]);

  const getNotes = async () => {
    try {
      setIsFetching(true);
      const response = await getAllNotesService();

      //Set status
      setNotes(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  const editNote = async (id) => {
    try {
      await editNoteService(id, {
        status,
      });
      getNotes();
    } catch (error) {
      toast.error("Error: " + error.response.data.errorMessage);
    }
  };

  const hadleDeleteNote = async (id) => {
    try {
      const noteDeleted = await deleteNoteService(id);
      toast.info(`Note Deleted: "${noteDeleted.data.textOfData}"`, {
        autoClose: 2000,
      });
      getNotes();
    } catch (error) {
      toast.error("Error: " + error.response.data.errorMessage);
    }
  };

  //Guard Clausure
  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 pt-5 text-center">My Notes</h2>
      <div className="flex items-center text-center justify-around">
        <p className="text-xs bg-orange-500 rounded-full w-20 ">Pendient</p>
        <p className="text-xs bg-blue-500 rounded-full w-20 ">Doing</p>
        <p className=" text-xs bg-green-600 rounded-full w-20 ">Done</p>
      </div>
      <div className="p-4">
        <ul className="list-disc flex flex-col gap-2 p-6 list-inside shadow-2xl border-primary border-1">
          {notes.length === 0
            ? "Add Notes to the list"
            : notes.map((note) => (
                <li
                  style={
                    note.status === "done"
                      ? { borderColor: "green" }
                      : note.status === "process"
                      ? { borderColor: "blue" }
                      : { borderColor: "orange" }
                  }
                  className={`flex justify-between box-border mr-5 border-b-2  border-spacing-2 border-${getStatusColor(
                    note.status
                  )}-500`}
                  key={note._id}
                >
                  <p
                    style={
                      note.status === "done"
                        ? { color: "green" }
                        : note.status === "process"
                        ? { color: "blue" }
                        : { color: "orange" }
                    }
                  >
                    {note.text}
                  </p>

                  <div className="flex gap-3 items-center">
                    <select
                      onChange={handleStatusChange}
                      className={`cursor-pointer w-4 h-4  bg-${getStatusColor(
                        note.status
                      )}-500 `}
                      value={status}
                      noteId={note._id}
                    >
                      <option disabled value="">
                        Status
                      </option>
                      <option value="pendient">Pendient</option>
                      <option value="process">In Process</option>
                      <option value="done">Done</option>
                    </select>
                    <button onClick={() => hadleDeleteNote(note._id)}>
                      <AiFillDelete className="text-red-500" />
                    </button>
                  </div>
                </li>
              ))}
        </ul>
      </div>

      <AddNote getNotes={getNotes} />
    </div>
  );
};

export default NoteList;
