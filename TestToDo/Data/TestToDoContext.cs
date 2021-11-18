using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestToDo.Models;

namespace TestToDo.Data
{
    public class TestToDoContext : DbContext
    {
        public TestToDoContext (DbContextOptions<TestToDoContext> options)
            : base(options)
        {
        }

        public DbSet<TestToDo.Models.Task> Task { get; set; }
    }
}
