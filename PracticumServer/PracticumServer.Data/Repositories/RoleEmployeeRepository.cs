using Microsoft.EntityFrameworkCore;
using PracticumServer.Core.Entities;
using PracticumServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Data.Repositories
{
    public class RoleEmployeeRepository:IRoleEmployeeRepository
    {
        private readonly DataContext _context;

        public RoleEmployeeRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<RoleEmployee> AddRoleEmployee(RoleEmployee roleEmployee)
        {
            _context.roleEmployees.Add(roleEmployee);
            await _context.SaveChangesAsync();
            return roleEmployee;
        }

        public  async Task DeleteRoleEmployee(int id)
        {
            var roll =await GetRoleEmployeeById(id);
            _context.roleEmployees.Remove(roll);
            await _context.SaveChangesAsync();
        }

      public List<RoleEmployee> GetAllRoleEmployees()
        {
            return _context.roleEmployees.ToList();
        }

        public async Task<RoleEmployee> GetRoleEmployeeById(int id)
        {
            return await _context.roleEmployees.FindAsync(id);
        }

        public async Task<RoleEmployee> UpdateRoleEmployee(int id, RoleEmployee roleEmployee)
        {
            var temp =await GetRoleEmployeeById(id);

            temp.StartDate = roleEmployee.StartDate;
            temp.RoleId = roleEmployee.RoleId;
            temp.Role = roleEmployee.Role;
            temp.EmpId = roleEmployee.EmpId;
            temp.Employee = roleEmployee.Employee;
            await _context.SaveChangesAsync();
            return temp;
        }
       
    }
}
