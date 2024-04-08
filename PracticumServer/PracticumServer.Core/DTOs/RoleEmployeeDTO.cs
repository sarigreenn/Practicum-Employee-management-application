using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.DTOs
{
    public class RoleEmployeeDTO
    {
        public RoleDTO Role { get; set; }

        public DateOnly DateOfStart { get; set; }
    }
}
