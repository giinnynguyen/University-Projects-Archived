using HPMusic.App_Start;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;

#nullable disable
namespace HPMusic;

public class Startup
{
  public void Configuration(IAppBuilder app)
  {
    app.CreatePerOwinContext<ApplicationDbContext>(new Func<ApplicationDbContext>(ApplicationDbContext.Create));
    app.CreatePerOwinContext<ApplicationUserManager>(new Func<IdentityFactoryOptions<ApplicationUserManager>, IOwinContext, ApplicationUserManager>(ApplicationUserManager.Create));
    app.CreatePerOwinContext<ApplicationSignInManager>(new Func<IdentityFactoryOptions<ApplicationSignInManager>, IOwinContext, ApplicationSignInManager>(ApplicationSignInManager.Create));
    IAppBuilder app1 = app;
    CookieAuthenticationOptions options = new CookieAuthenticationOptions();
    options.AuthenticationType = "ApplicationCookie";
    options.LoginPath = new PathString("/Account/Login");
    app1.UseCookieAuthentication(options);
  }
}
