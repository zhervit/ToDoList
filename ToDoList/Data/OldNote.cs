using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Data
{
	[Serializable]
	public class OldNote : INote
	{
		private int id;

		public int Id
		{
			get => id;
			set => id = value;
		}

		public string Name { get; set; }

		public string Text { get; set; }
		public string Category { get; set; }

		public OldNote()
		{

		}

		public OldNote(string title = "", string text = "")
		{
			Id = 11;
			Name = title;
			Text = text;
		}


	}

}
