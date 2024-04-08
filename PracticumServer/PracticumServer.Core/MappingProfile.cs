using AutoMapper;
using PracticumServer.Core.DTOs;
using PracticumServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<Role, RoleDTO>().ReverseMap();
            CreateMap<RoleEmployee, RoleEmployeeDTO>().ReverseMap();

        }
    }
}
