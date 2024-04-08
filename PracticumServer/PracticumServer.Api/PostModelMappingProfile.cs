using AutoMapper;
using PracticumServer.Api.Models;
using PracticumServer.Core.DTOs;
using PracticumServer.Core.Entities;

namespace PracticumServer.Api
{
    public class PostModelMappingProfile:Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<EmployeeModel, Employee>().ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles)).ReverseMap();
            CreateMap<RoleModel, Role>().ReverseMap();
            CreateMap<RoleEmployee, RoleEmployeeModel>().ReverseMap();
        }
    }
}
