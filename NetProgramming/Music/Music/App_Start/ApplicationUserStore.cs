using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

#nullable disable
namespace HPMusic.App_Start;

public class ApplicationUserStore(ApplicationDbContext context) : UserStore<ApplicationUser>((DbContext) context)
{
}
