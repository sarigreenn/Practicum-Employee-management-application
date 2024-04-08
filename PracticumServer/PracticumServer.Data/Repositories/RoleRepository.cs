using Microsoft.EntityFrameworkCore;
using PracticumServer.Core.Entities;
using PracticumServer.Core.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Data.Repositories
{
    public class RoleRepository:IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return  _context.roles.ToList();
        }

        public async Task<Role> AddRole(Role role)
        {
            _context.roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

        public async Task DeleteRole(int id)
        {
            var role =  GetRoleById(id);
            _context.roles.Remove(role);
            await _context.SaveChangesAsync();
        }
       
        public Role GetRoleById(int id)
        {
            return _context.roles.Find(id);
        }
     
        public async Task<Role> UpdateRole(int id, Role role)
        {
            Role temp =  GetRoleById(id);
           
            temp.Name = role.Name;

            temp.IsManegerial = role.IsManegerial;

            await _context.SaveChangesAsync();
            return role;
        }

    }
}
