using PracticumServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Services
{
    public interface IRoleEmployeeService
    {
     List<RoleEmployee> GetAllRoleEmployees();
        public Task<RoleEmployee> GetRoleEmployeeById(int id);
        public Task<RoleEmployee> AddRoleEmployee(RoleEmployee roleEmployee);
        public Task<RoleEmployee> UpdateRoleEmployee(int id, RoleEmployee roleEmployee);
        public Task DeleteRoleEmployee(int id);
    }
}
