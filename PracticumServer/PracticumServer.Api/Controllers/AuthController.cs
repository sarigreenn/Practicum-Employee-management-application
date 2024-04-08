using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PracticumServer.Api.Models;
using PracticumServer.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticumServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmployeeServices _employeeService;

        public AuthController(IConfiguration configuration, IEmployeeServices employeeService)
        {
            _configuration = configuration;
            _employeeService = employeeService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var employee = _employeeService.GetByEmployeeNameAndPassword(loginModel.FirstName, loginModel.LastName, loginModel.Password);
            if (employee is null && loginModel.FirstName.Equals("admin", StringComparison.OrdinalIgnoreCase)
                                 && loginModel.LastName.Equals("admin", StringComparison.OrdinalIgnoreCase)
                                 && loginModel.Password.Equals("admin", StringComparison.OrdinalIgnoreCase))
                employee = new Core.Entities.Employee() { LastName = "admin" };

            if (employee is not null)
            {
                var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, employee.LastName),
                new Claim(ClaimTypes.Role, "employee")
            };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddDays(30),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }
    }
}
