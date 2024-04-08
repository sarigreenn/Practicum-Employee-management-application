namespace PracticumServer.Api.MiddleWares
{
    public class ShabbatMiddleWare
    {
        private readonly RequestDelegate _next;
        public ShabbatMiddleWare(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var guid = Guid.NewGuid().ToString();
            context.Items.Add("guid", guid);
            Console.WriteLine("middleware start :: " + guid);
            if (DateTime.Today.DayOfWeek == DayOfWeek.Saturday)
            {
                await context.Response.WriteAsync(new HttpResponseMessage
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent("Our site keeps the Shabbat", System.Text.Encoding.UTF8, "application/json")
                }.ToString());
            }
            else
            {
                await _next(context);
            }



            Console.WriteLine("middleware end :: " + guid);
        }
    }

    public static class ShabbatMiddlewareExtensions
    {
        public static IApplicationBuilder UseShabbat(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ShabbatMiddleWare>();
        }
    }
}
