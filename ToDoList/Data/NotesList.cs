using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Data
{
	public class NotesList
	{
		private static NotesList instance;
		public List<Note> Notes
		{
			get; private set;
		}

		private NotesList()
		{
			RetrieveAllNotes();
		}

		public static NotesList GetInstance()
		{
			return instance ?? (instance = new NotesList());
		}

		public void RetrieveAllNotes()
		{
			XMLFileSaver fs = new XMLFileSaver();
			Notes = fs.GetAllNotes().ToList();
		}

		public void Add(Note note)
		{
			XMLFileSaver fs = new XMLFileSaver();
			fs.AddNewNote(note);
			Notes = fs.GetAllNotes().ToList();
		}

		public void DeleteById(int id)
		{
			XMLFileSaver fs = new XMLFileSaver();
			fs.DeleteNote(id);
			Notes = fs.GetAllNotes().ToList();
		}
	}
}
