using PracticumServer.Core.Entities;
using PracticumServer.Core.Repositories;
using PracticumServer.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Service
{
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _roleRepository.GetAllRoles();
        }
       
        public Role GetRoleById(int id)
        {
            return  _roleRepository.GetRoleById(id);
        }

        public async Task<Role> AddRole(Role role)
        {
            return await _roleRepository.AddRole(role);
        }

        public async Task<Role> UpdateRole(int id, Role role)
        {
            return await _roleRepository.UpdateRole(id, role);
        }

        public async Task DeleteRole(int id)
        {
            await _roleRepository.DeleteRole(id);
        }

    }
}
