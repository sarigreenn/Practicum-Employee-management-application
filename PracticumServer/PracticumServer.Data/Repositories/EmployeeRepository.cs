using Microsoft.EntityFrameworkCore;
using PracticumServer.Core.Entities;
using PracticumServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Data.Repositories
{
    public class EmployeeRepository :IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
                _context = context;
        }
        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            var list = await _context.employees.Include(x => x.Roles).ThenInclude(role => role.Role).ToListAsync();
            return list;
        }
        public async Task<Employee> AddEmployee(Employee employee)
        {
            _context.employees.Add(employee);
          await  _context.SaveChangesAsync();
            return employee;
  
        }

        public async Task DeleteEmployee(int id)
        {
            Employee em = await _context.employees.FindAsync(id);
            if (em == null)
                return;
            em.Status = Status.Inactive;
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _context.employees
           .Include(x => x.Roles)
           .ThenInclude(role => role.Role)
           .FirstOrDefaultAsync(e => e.Id == id);

        }


        public async Task<Employee>  UpdateEmployee(int id, Employee employee)
        {
            var updateEmployee =await  GetEmployeeById(id);
            employee.Id = id;
            if (updateEmployee != null)
            {
                _context.Entry(updateEmployee).CurrentValues.SetValues(employee);
                _context.Entry(updateEmployee).Collection(e => e.Roles).CurrentValue = employee.Roles;
            }
            else
            {
                throw new EntryPointNotFoundException($"Worker with ID {id} not found");
            }
            await _context.SaveChangesAsync();
            return updateEmployee;
        }

        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return _context.employees.FirstOrDefault(e => e.FirstName == employeeFirstName && e.LastName == employeeLastName && e.Password == employeePassword);
        }

    }
}
