using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using ToDoList.Data;

namespace ToDoList.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ValuesController : ControllerBase
	{

		private List<Note> notes = new List<Note>();

		static ValuesController()
		{
		}

		// GET api/values
		[HttpGet]
		public ActionResult<IEnumerable<Note>> Get()
		{

			//var note = new Note("title", "text");
			//notes.Add(note);
			var notesList = NotesList.GetInstance();
			return notesList.Notes;
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
