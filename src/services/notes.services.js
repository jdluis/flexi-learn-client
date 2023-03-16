import service from "./config.services";

const getAllNotesService = () => {
  return service.get("/notes");
};

const addNoteService = (data) => {
  return service.post("/notes/add",data);
};

const editNoteService = (id, data) => {
  return service.patch(`/notes/${id}/edit`, data);
};

const deleteNoteService = (id) => {
  return service.delete(`/notes/${id}/delete`);
};

export {
  getAllNotesService,
  deleteNoteService,
  editNoteService,
  addNoteService,
};
