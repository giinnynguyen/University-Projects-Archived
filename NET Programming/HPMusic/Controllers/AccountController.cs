using HPMusic.App_Start;
using HPMusic.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.CSharp.RuntimeBinder;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Controllers;

public class AccountController : Controller
{
  private ApplicationSignInManager singInManager;
  private ApplicationUserManager userManager;

  public ApplicationSignInManager SignInManager
  {
    get => this.singInManager ?? this.HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
    private set => this.singInManager = value;
  }

  public ApplicationUserManager UserManager
  {
    get
    {
      return this.userManager ?? this.HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
    }
    private set => this.userManager = value;
  }

  [AllowAnonymous]
  public ActionResult Login(string returnUrl)
  {
    // ISSUE: reference to a compiler-generated field
    if (AccountController.\u003C\u003Eo__8.\u003C\u003Ep__0 == null)
    {
      // ISSUE: reference to a compiler-generated field
      AccountController.\u003C\u003Eo__8.\u003C\u003Ep__0 = CallSite<Func<CallSite, object, string, object>>.Create(Binder.SetMember(CSharpBinderFlags.None, "ReturnUrl", typeof (AccountController), (IEnumerable<CSharpArgumentInfo>) new CSharpArgumentInfo[2]
      {
        CSharpArgumentInfo.Create(CSharpArgumentInfoFlags.None, (string) null),
        CSharpArgumentInfo.Create(CSharpArgumentInfoFlags.UseCompileTimeType, (string) null)
      }));
    }
    // ISSUE: reference to a compiler-generated field
    // ISSUE: reference to a compiler-generated field
    object obj = AccountController.\u003C\u003Eo__8.\u003C\u003Ep__0.Target((CallSite) AccountController.\u003C\u003Eo__8.\u003C\u003Ep__0, this.ViewBag, returnUrl);
    return (ActionResult) this.View();
  }

  [HttpPost]
  [AllowAnonymous]
  [ValidateAntiForgeryToken]
  public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
  {
    if (!this.ModelState.IsValid)
      return (ActionResult) this.View((object) model);
    switch (await this.SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, false))
    {
      case SignInStatus.Success:
        return this.RedirectToLocal(returnUrl);
      default:
        this.ModelState.AddModelError("", "Invalid login attempt.");
        return (ActionResult) this.View((object) model);
    }
  }

  [AllowAnonymous]
  public ActionResult Register() => (ActionResult) this.View();

  [HttpPost]
  [AllowAnonymous]
  [ValidateAntiForgeryToken]
  public async Task<ActionResult> Register(RegisterViewModel model)
  {
    if (this.ModelState.IsValid)
    {
      ApplicationUser applicationUser = new ApplicationUser();
      applicationUser.UserName = model.UserName;
      applicationUser.Email = model.Email;
      applicationUser.Avatar = "";
      applicationUser.UserProfile = new UserProfile()
      {
        UserName = model.UserName
      };
      ApplicationUser user = applicationUser;
      IdentityResult result = await this.UserManager.CreateAsync(user, model.Password);
      if (result.Succeeded)
      {
        await this.SignInManager.SignInAsync(user, false, false);
        string confirmationTokenAsync = await this.UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
        await this.UserManager.SendEmailAsync(user.Id, "Confirm your account", $"Please confirm your account by clicking <a href=\"{this.Url.Action("ConfirmEmail", "Account", (object) new
        {
          userId = user.Id,
          code = confirmationTokenAsync
        }, this.Request.Url.Scheme)}\">here</a>");
        // ISSUE: reference to a compiler-generated field
        if (AccountController.\u003C\u003Eo__11.\u003C\u003Ep__0 == null)
        {
          // ISSUE: reference to a compiler-generated field
          AccountController.\u003C\u003Eo__11.\u003C\u003Ep__0 = CallSite<Func<CallSite, object, string, object>>.Create(Binder.SetMember(CSharpBinderFlags.None, "Message", typeof (AccountController), (IEnumerable<CSharpArgumentInfo>) new CSharpArgumentInfo[2]
          {
            CSharpArgumentInfo.Create(CSharpArgumentInfoFlags.None, (string) null),
            CSharpArgumentInfo.Create(CSharpArgumentInfoFlags.UseCompileTimeType | CSharpArgumentInfoFlags.Constant, (string) null)
          }));
        }
        // ISSUE: reference to a compiler-generated field
        // ISSUE: reference to a compiler-generated field
        object obj = AccountController.\u003C\u003Eo__11.\u003C\u003Ep__0.Target((CallSite) AccountController.\u003C\u003Eo__11.\u003C\u003Ep__0, this.ViewBag, "Check your email and confirm your account, you must be confirmed before you can log in.");
        return (ActionResult) this.RedirectToAction("NotifyRegister", nameof (Register));
      }
      this.AddErrors(result);
      user = (ApplicationUser) null;
      result = (IdentityResult) null;
    }
    return (ActionResult) this.View((object) model);
  }

  [HttpPost]
  [ValidateAntiForgeryToken]
  public ActionResult LogOff()
  {
    this.AuthenticationManager.SignOut();
    return (ActionResult) this.RedirectToAction("Index", "Home");
  }

  public ActionResult ConfirmEmail() => (ActionResult) this.View();

  private IAuthenticationManager AuthenticationManager
  {
    get => this.HttpContext.GetOwinContext().Authentication;
  }

  private void AddErrors(IdentityResult result)
  {
    foreach (string error in result.Errors)
      this.ModelState.AddModelError("", error);
  }

  private ActionResult RedirectToLocal(string returnUrl)
  {
    return this.Url.IsLocalUrl(returnUrl) ? (ActionResult) this.Redirect(returnUrl) : (ActionResult) this.RedirectToAction("Index", "Home");
  }
}
