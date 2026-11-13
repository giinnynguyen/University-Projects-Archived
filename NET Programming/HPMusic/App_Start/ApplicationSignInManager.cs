using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;

#nullable disable
namespace HPMusic.App_Start;

public class ApplicationSignInManager(
  ApplicationUserManager userManager,
  IAuthenticationManager authenticationManager) : SignInManager<ApplicationUser, string>((Microsoft.AspNet.Identity.UserManager<ApplicationUser, string>) userManager, authenticationManager)
{
  public static ApplicationSignInManager Create(
    IdentityFactoryOptions<ApplicationSignInManager> options,
    IOwinContext context)
  {
    return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
  }
}
