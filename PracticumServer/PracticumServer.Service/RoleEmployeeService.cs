using PracticumServer.Core.Entities;
using PracticumServer.Core.Repositories;
using PracticumServer.Core.Services;
using PracticumServer.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Service
{
    public class RoleEmployeeService : IRoleEmployeeService
    {
        private readonly IRoleEmployeeRepository _roleEmployeeRepository;

        public RoleEmployeeService(IRoleEmployeeRepository RoleEmployeeRepository)
        {
            _roleEmployeeRepository = RoleEmployeeRepository;
        }

        public List<RoleEmployee> GetAllRoleEmployees()
        {
            return _roleEmployeeRepository.GetAllRoleEmployees();
        }

        public async Task<RoleEmployee> GetRoleEmployeeById(int id)
        {
            return await _roleEmployeeRepository.GetRoleEmployeeById(id);
        }

        public async Task<RoleEmployee> AddRoleEmployee(RoleEmployee roleEmployee)
        {
            return await _roleEmployeeRepository.AddRoleEmployee(roleEmployee);
        }

        public Task<RoleEmployee> UpdateRoleEmployee(int id, RoleEmployee roleEmployee)
        {

            return _roleEmployeeRepository.UpdateRoleEmployee(id, roleEmployee);
        }

        public Task DeleteRoleEmployee(int id)
        {
            return _roleEmployeeRepository.DeleteRoleEmployee(id);
        }

    }
}
