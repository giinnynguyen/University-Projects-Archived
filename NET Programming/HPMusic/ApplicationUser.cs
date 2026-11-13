using Microsoft.AspNet.Identity.EntityFramework;

#nullable disable
public class ApplicationUser : IdentityUser
{
  public string Avatar { get; set; }

  public virtual UserProfile UserProfile { get; set; }
}
