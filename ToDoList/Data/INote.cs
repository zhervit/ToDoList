using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Data
{
	public interface INote
	{
		string Name { get; set; }
		string Text { get; set; }
		string Category { get; set; }
	}
}
