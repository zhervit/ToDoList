using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Data
{
	public class PreparedNote
	{
		public string Category;
		public string Name;
		public string Text;
		public string ImageAddress;
		public bool? IsChecked;
		public int Id { get; set; }
	}
}
