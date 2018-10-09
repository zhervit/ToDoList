using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace ToDoList.Data
{
	public class XMLFileSaver : ISaver
	{
		private string _path = "DB/xmldb.xml";


		public void AddNewNote(Note note)
		{
			XDocument doc = XDocument.Load(_path);

			int newId = doc.Root.Elements("Note").Max(t => Int32.Parse(t.Attribute("id").Value))+1;

			XElement noteElement = new XElement("Note",
				new XAttribute("id", + newId),
				new XElement("Name", note.Name),
				new XElement("Text", note.Text),
				new XElement("Category", note.Category));
			doc.Root.Add(noteElement);
			doc.Save(_path);

			//XmlSerializer formatter = new XmlSerializer(typeof(Note));

			//using (FileStream aFile = new FileStream(_path, FileMode.Append, FileAccess.Write))
			//using (StreamWriter sw = new StreamWriter(aFile))
			//{
			//	formatter.Serialize(sw, note);
			//}

		}

		public void SaveExistingNote(Note note)
		{
			throw new NotImplementedException();
		}


		public void CreateExample()
		{
			XDocument doc = new XDocument(
				new XElement("List",
					new XElement("Note",
						new XAttribute("id", 0),
						new XElement("Name", "testName"),
						new XElement("Text", "TestText"),
						new XElement("Category", "Category")
					)));	
					
			doc.Save(_path);
		}


		public IEnumerable<Note> GetAllNotes()
		{

			var notesList = new List<Note>();

			XDocument doc = XDocument.Load(_path);
			
			foreach (XElement el in doc.Root.Elements())
			{
				Note note = new Note();
				note.Id = Convert.ToInt32(el.Attribute("id").Value);
				note.Name = el.Element("Name")?.Value;
				note.Text = el.Element("Text")?.Value;
				note.Category = el.Element("Category")?.Value;

				notesList.Add(note);
			}

			return notesList;
			//XmlSerializer formatter = new XmlSerializer(typeof(List<Note>));

			//List<Note> notes = new List<Note>();

			//using (FileStream fs = new FileStream(_path, FileMode.OpenOrCreate))
			//{
			//	notes = (List<Note>)formatter.Deserialize(fs);
			//}

			//return notes;
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

		public void DeleteNote(int id)
		{
			XDocument doc = XDocument.Load(_path);

			IEnumerable<XElement> tracks = doc.Root.Descendants("Note").Where(
					t => t.Attribute("id").Value == id.ToString());
			tracks.Remove();
			doc.Save(_path);
		}
	}
}
