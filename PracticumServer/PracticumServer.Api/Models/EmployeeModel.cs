using PracticumServer.Core.Entities;

namespace PracticumServer.Api.Models
{
    public class EmployeeModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int EmpId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly BirthDate { get; set; }
        public gender Gender { get; set; }
        public Status Status { get; set; }
        public List<RoleEmployeeModel> Roles { get; set; }
        public string Password { get; set; }

    }
}
