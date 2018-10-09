using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using ToDoList.Data;

namespace ToDoList.Controllers
{

	public class Category
	{
		public string Name;
		public List<Note> Notes;
	}


	[Route("api/[controller]")]
	[ApiController]
	public class ValuesController : ControllerBase
	{
		// GET api/values
		[HttpGet]
		public List<Category> Get()
		{
			var notesList = NotesList.GetInstance();

			var groupedNotes = notesList.Notes.GroupBy(x => x.Category)
								  .Select(group => new KeyValuePair<string,List<Note>>( group.Key,group.ToList()))
								  .ToDictionary(x=>x.Key, x=>x.Value);

			var res = new List<Category>();
			foreach (var groupedNote in groupedNotes)
			{
				var cat = new Category();
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
		public void Post([FromBody] Note note)
		{
			var notesList = NotesList.GetInstance();
			notesList.Add(note);
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
			var notesList = NotesList.GetInstance();

			notesList.DeleteById(id);
		}
	}
}
