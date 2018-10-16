using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.DbData
{
	public class Note
	{
		public int NoteID { get; set; }
		public int CategoryID { get; set; }
		public string Name { get; set; }
		public string Text { get; set; }
		public bool? IsChecked { get; set; }

	}
}
