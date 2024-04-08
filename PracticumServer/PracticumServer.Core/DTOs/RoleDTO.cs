using PracticumServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.DTOs
{
    public class RoleDTO
    {
      
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsManegerial { get; set; }
    }
}
