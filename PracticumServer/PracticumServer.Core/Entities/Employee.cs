using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.DataAnnotations;


namespace PracticumServer.Core.Entities
{
    public enum gender
    {
        male, female

    };
    public enum Status
    {
        Active, Inactive
    }

    public class Employee
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Id { get; set; }
        public int EmpId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly BirthDate { get; set; }
        public gender Gender { get; set; }
        public Status Status { get; set; }
        public List<RoleEmployee> Roles { get; set; }
        public string Password { get; set; }

    }
}
