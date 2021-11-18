using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestToDo.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TestToDoContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
