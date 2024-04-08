namespace PracticumServer.Api.Models
{
    public class RoleEmployeeModel
    {
        public int RoleId { get; set; }

        public bool IsManegerial { get; set; }
        public DateOnly StartDate { get; set; }
    }
}
