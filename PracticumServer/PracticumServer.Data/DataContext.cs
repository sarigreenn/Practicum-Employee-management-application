using Microsoft.EntityFrameworkCore;
using PracticumServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Employee> employees {get; set;}
        public DbSet<Role> roles { get; set; }
        public DbSet<RoleEmployee> roleEmployees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=employee");
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }
    }
}
