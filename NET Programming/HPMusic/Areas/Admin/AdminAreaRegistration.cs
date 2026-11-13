using System.Web.Mvc;

#nullable disable
namespace HPMusic.Areas.Admin;

public class AdminAreaRegistration : AreaRegistration
{
  public override string AreaName => "Admin";

  public override void RegisterArea(AreaRegistrationContext context)
  {
    context.MapRoute("Admin_default", "Admin/{controller}/{action}/{id}", (object) new
    {
      action = "Index",
      controller = "Admin",
      id = UrlParameter.Optional
    });
  }
}
