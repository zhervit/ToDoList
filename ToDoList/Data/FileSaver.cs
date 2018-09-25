using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace ToDoList.Data
{
	public class FileSaver : ISaver
	{
		private string _path = "DB/xmldb.txt";


		public void AddNewNote(Note note)
		{
			XmlSerializer formatter = new XmlSerializer(typeof(Note));

			using (FileStream aFile = new FileStream(_path, FileMode.Append, FileAccess.Write))
			using (StreamWriter sw = new StreamWriter(aFile))
			{
				formatter.Serialize(sw, note);
			}

		}

		public void SaveExistingNote(Note note)
		{
			throw new NotImplementedException();
		}


		public IEnumerable<Note> GetAllNotes()
		{
			XmlSerializer formatter = new XmlSerializer(typeof(IEnumerable<Note>));

			List<Note> notes = new List<Note>();

			using (FileStream fs = new FileStream(_path, FileMode.OpenOrCreate))
			{
				notes = (List<Note>)formatter.Deserialize(fs);
			}

			return notes;
		}

		public Note GetNoteById(int id)
		{
			Note newPerson = null;
			XmlSerializer formatter = new XmlSerializer(typeof(Note));
			using (FileStream fs = new FileStream(_path, FileMode.OpenOrCreate))
			{
				newPerson = (Note)formatter.Deserialize(fs);
			}

			return newPerson;
		}
	}
}
