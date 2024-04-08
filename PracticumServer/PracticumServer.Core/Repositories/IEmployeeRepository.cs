using PracticumServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployees();
        public Task<Employee> GetEmployeeById(int id);
        public Task<Employee> AddEmployee(Employee employee);
        public Task<Employee> UpdateEmployee(int id, Employee employee);
        public Task DeleteEmployee(int id);
        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword);
    }
}
