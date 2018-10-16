using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoList.DbData;

namespace ToDoList.Data
{
	public interface ISaver
	{
		void AddNewNote(INote note);
		void SaveExistingNote(INote note);
		INote GetNoteById(int id);
		IEnumerable<INote> GetAllNotes();
	}
}
