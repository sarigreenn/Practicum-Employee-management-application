using PracticumServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.DTOs
{
    public class EmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Id { get; set; }
        public int EmpId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly BirthDate { get; set; }
        public gender Gender { get; set; }
        public Status Status { get; set; }
        public List<RoleEmployeeDTO> Roles { get; set; }
  
    }
}
