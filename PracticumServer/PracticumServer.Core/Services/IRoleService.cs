using PracticumServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Services
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetAllRoles();
        public Role GetRoleById(int id);
        public Task<Role> AddRole(Role role);
        public Task<Role> UpdateRole(int id, Role role);
        public Task DeleteRole(int id);
    }
}
