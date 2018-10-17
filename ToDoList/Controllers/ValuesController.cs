using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using ToDoList.Data;
using ToDoList.DbData;

namespace ToDoList.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ValuesController : ControllerBase
	{
		private NotesDbContext _db;
		public ValuesController(NotesDbContext context)
		{
			_db = context;
		}

		// GET api/values
		[HttpGet]
		public List<PreparedCategory> Get()
		{
			var notesList = _db.Notes.Join(_db.Categories,
				n => n.CategoryID,
				cat => cat.CategoryID,
				(n, cat) => new PreparedNote {Id = n.NoteID, Category = cat.Name, Name = n.Name, Text = n.Text,ImageAddress = n.ImageAddress, IsChecked=n.IsChecked }).ToList();



			var groupedNotes = notesList.GroupBy(x => x.Category)
								  .Select(group => new KeyValuePair<string, List<PreparedNote>>(group.Key, group.ToList()))
								  .ToDictionary(x => x.Key, x => x.Value);

			var res = new List<PreparedCategory>();
			foreach (var groupedNote in groupedNotes)
			{
				var cat = new PreparedCategory();
				cat.Name = groupedNote.Key;
				cat.Notes = groupedNote.Value;

				res.Add(cat);
			}

			return res;

			//return groupedNotes;
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public ActionResult<string> Get(int id)
		{
			return "value";
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody] PreparedNote note)
		{
			var categories = _db.Categories.Select(c => c.Name);

			var newNote = new Note {Name = note.Name, Text = note.Text, ImageAddress = note.ImageAddress };

			if (categories.Contains(note.Category))
			{
				newNote.CategoryID = _db.Categories.FirstOrDefault(c => c.Name.Equals(note.Category)).CategoryID;
			}
			else
			{
				var category = new Category {Name = note.Category, UserID = 1}; //todo useid
				_db.Categories.Add(category);
				_db.SaveChanges();
				newNote.CategoryID = _db.Categories.FirstOrDefault(c => c.Name.Equals(note.Category)).CategoryID;
			}

			_db.Notes.Add(newNote);
			_db.SaveChanges();
			//var notesList = NotesList.GetInstance();
			//notesList.Add(note);
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			var note = _db.Notes.FirstOrDefault(n => n.NoteID == id);
			if (note != null)
			{
				_db.Notes.Remove(note);
				_db.SaveChanges();
			}
		}
	}
}
