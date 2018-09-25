using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Data
{
	public interface ISaver
	{
		void AddNewNote(Note note);
		void SaveExistingNote(Note note);
		Note GetNoteById(int id);
		IEnumerable<Note> GetAllNotes();
	}
}
