import { addNoteService } from "../services/notes.services.js";
import { useState } from "react";
import { toast } from "react-toastify";

function AddNote(props) {
  const [text, setText] = useState("");
  const { getNotes } = props;
  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    try {
      await addNoteService({
        text: text,
      });
      getNotes();
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };
  return (
    <div className={"flex gap-5 flex-col p-4"}>
      <input
        row="5"
        className={
          "bg-white text-black border-1 rounded-lg shadow-xl border-neutral-400 px-2"
        }
        onChange={handleInput}
        placeholder="Write your note for remember"
        value={text}
      ></input>

      <button
        className={"p-2 bg-green-600 rounded-full w-20 "}
        onClick={handleAddClick}
      >
        Add
      </button>
    </div>
  );
}

export default AddNote;
