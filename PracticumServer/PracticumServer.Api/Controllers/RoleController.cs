using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PracticumServer.Api.Models;
using PracticumServer.Core.DTOs;
using PracticumServer.Core.Entities;
using PracticumServer.Core.Services;
using PracticumServer.Service;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticumServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
       
        public RoleController(IRoleService roleService,IMapper mapper )
        {
            _roleService = roleService;
            _mapper = mapper;
          
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_roleService.GetAllRoles());
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var role =  _roleService.GetRoleById(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleModel role)
        {
            var roleDTO = _mapper.Map<Role>(role);
            var role1 = await _roleService.AddRole(roleDTO);
            return Ok(role1);
        }

      
        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RoleModel role)
        {

            var RoleToUpdate = _mapper.Map<Role>(role);
            return Ok(await _roleService.UpdateRole(id, RoleToUpdate));
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _roleService.DeleteRole(id);
        }
    }
}
