using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

#nullable disable
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
  public ApplicationDbContext()
    : base("Data Source =; Initial Catalog = music; Persist Security Info=True;User ID = ; Password=;MultipleActiveResultSets=True")
  {
  }

  public static ApplicationDbContext Create() => new ApplicationDbContext();

  public DbSet<global::UserProfile> UserProfile { get; set; }
}
