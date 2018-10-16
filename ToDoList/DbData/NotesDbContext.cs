using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ToDoList.DbData
{
	public class NotesDbContext	: DbContext
	{
		public NotesDbContext(DbContextOptions<NotesDbContext> options)
			: base(options)
		{
			//Database.EnsureCreated();
		}

		public DbSet<Note> Notes { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<User> Users { get; set; }

	}
}
