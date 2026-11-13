using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System.Data.Entity;

#nullable disable
namespace HPMusic.App_Start;

public class ApplicationUserManager(IUserStore<ApplicationUser> store) : UserManager<ApplicationUser>(store)
{
  public static ApplicationUserManager Create(
    IdentityFactoryOptions<ApplicationUserManager> options,
    IOwinContext context)
  {
    ApplicationUserManager applicationUserManager = new ApplicationUserManager((IUserStore<ApplicationUser>) new UserStore<ApplicationUser>((DbContext) context.Get<ApplicationDbContext>()));
    applicationUserManager.PasswordValidator = (IIdentityValidator<string>) new Microsoft.AspNet.Identity.PasswordValidator()
    {
      RequiredLength = 6,
      RequireNonLetterOrDigit = false,
      RequireDigit = false,
      RequireLowercase = false,
      RequireUppercase = false
    };
    applicationUserManager.UserTokenProvider = (IUserTokenProvider<ApplicationUser, string>) new TotpSecurityStampBasedTokenProvider<ApplicationUser, string>();
    applicationUserManager.EmailService = (IIdentityMessageService) new HPMusic.App_Start.EmailService();
    return applicationUserManager;
  }
}
