using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Entities
{
    public class RoleEmployee
    {
        public int Id { get; set; }
        public int EmpId { get; set; }
        public int RoleId { get; set; }
        public Employee Employee { get; set; }
        public Role Role { get; set; }
        public DateOnly StartDate { get; set; }
    }
}
