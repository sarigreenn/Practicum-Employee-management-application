using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PracticumServer.Api.Models;
using PracticumServer.Core.DTOs;
using PracticumServer.Core.Entities;
using PracticumServer.Core.Services;
using PracticumServer.Service;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticumServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    { 
        private readonly IEmployeeServices _employeeService;
        private readonly IMapper _mapper;
        private readonly IRoleService _RoleService;
   private readonly   IRoleEmployeeService _RoleEmployee;
        public EmployeeController(IEmployeeServices employeeService,IMapper mapper,IRoleService roleService, IRoleEmployeeService _Role)
        {
            _employeeService = employeeService; 
            _mapper=mapper;
            _RoleService = roleService;
            _RoleEmployee = _Role;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> Get()
        {
            var employees = await _employeeService.GetAllEmployees();

            var employeesDto = employees.Where(e => e.Status == Status.Active).Select(e =>
            {
                var x = _mapper.Map<EmployeeDTO>(e);
                var dtoRoles = e.Roles.Select(r => new RoleEmployeeDTO { DateOfStart = r.StartDate, Role = new RoleDTO { Id = r.Role.Id, IsManegerial = r.Role.IsManegerial, Name = r.Role.Name } });
                x.Roles = dtoRoles.ToList();
                return x;
            });

          
            return Ok(employeesDto);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var employee = await _employeeService.GetEmployeeById(id); 
            if (employee == null)
            {
                return NotFound();
            }
            var employee1 = _mapper.Map<EmployeeDTO>(employee);
            return Ok(employee1);
        }

     

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeModel employee)
        {
            var Remp = new List<RoleEmployee>();
            foreach (var role in employee.Roles)
            {
                var role1 = _RoleService.GetRoleById(role.RoleId);

                if (role1 is null)
                {
                    return NotFound();
                }
                RoleEmployee employee1 = new RoleEmployee();

              

                employee1.RoleId = role.RoleId;
                employee1.StartDate = role.StartDate;
                Remp.Add(employee1);
            }
            var employeeDTO = _mapper.Map<Employee>(employee);
            employeeDTO.Roles = Remp;
            await _employeeService.AddEmployee(employeeDTO);
            var employee2 = _mapper.Map<EmployeeDTO>(employeeDTO);
            var dtoRoles = Remp.Select(r => new RoleEmployeeDTO { DateOfStart = r.StartDate, Role = new RoleDTO { Id = r.Role.Id, IsManegerial = r.Role.IsManegerial, Name = r.Role.Name } });
            employee2.Roles = dtoRoles.ToList();
            return Ok(employee2);
        }

         // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeeModel model)
        {
           
            foreach (var k in _RoleEmployee.GetAllRoleEmployees())
            {
                foreach (var role in model.Roles)
                {
                    if (k.RoleId == role.RoleId)
                        _RoleEmployee.DeleteRoleEmployee(k.Id);
                }
            }
            var employeeM = _mapper.Map<Employee>(model);
            var list = new List<RoleEmployee>();
            foreach (var role in model.Roles)
            {
                var r = _RoleService.GetRoleById(role.RoleId);
                if (r is null)
                {
                    return NotFound();
                }
                RoleEmployee e = new RoleEmployee();
                e.Role = r;
                e.RoleId = role.RoleId;
                e.StartDate = role.StartDate; 
                list.Add(e);
            }
            employeeM.Roles = list;
            var res = await _employeeService.UpdateEmployee(id, employeeM);
            var employee2 = _mapper.Map<EmployeeDTO>(res);
            return Ok(employee2);
        }

      

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _employeeService.DeleteEmployee(id);
        }
    }
}
