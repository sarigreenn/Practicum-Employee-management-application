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
    public class EmployeeService : IEmployeeServices
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            return await _employeeRepository.GetAllEmployees();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _employeeRepository.GetEmployeeById(id);
        }

        public async Task<Employee> AddEmployee(Employee employee)
        {
            return await _employeeRepository.AddEmployee(employee);
        }

        public async Task<Employee> UpdateEmployee(int id, Employee employee)
        {
            return await _employeeRepository.UpdateEmployee(id, employee);
        }

        public async Task DeleteEmployee(int id)
        {
            await _employeeRepository.DeleteEmployee(id);
        }
        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return _employeeRepository.GetByEmployeeNameAndPassword(employeeFirstName, employeeLastName, employeePassword);
        }

    }
}
