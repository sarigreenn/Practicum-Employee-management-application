using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PracticumServer.Api.Models;
using PracticumServer.Core.Entities;
using PracticumServer.Core.Services;
using PracticumServer.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticumServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleEmployeeController : ControllerBase
    {
        private IRoleEmployeeService _roleEmployeeService;
        private readonly IMapper _mapper;
        public RoleEmployeeController(IRoleEmployeeService roleEmployeeService, IMapper mapper)
        {
            _roleEmployeeService = roleEmployeeService;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_roleEmployeeService.GetAllRoleEmployees());
        }

        // GET api/<EmployController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var role = _roleEmployeeService.GetRoleEmployeeById(id);
            if (role is null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        // POST api/<EmployController>
        [HttpPost]
        public IActionResult Post([FromBody] RoleEmployeeModel role)
        {
            var roleEmp = _mapper.Map<RoleEmployee>(role);
            return Ok(_roleEmployeeService.AddRoleEmployee(roleEmp));

        }

        // PUT api/<EmployController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] RoleEmployeeModel role)
        {
            var roleEmp = _mapper.Map<RoleEmployee>(role);

            return Ok(_roleEmployeeService.UpdateRoleEmployee(id, roleEmp));

        }

        // DELETE api/<EmployController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _roleEmployeeService.DeleteRoleEmployee(id);
        }
    }
}
