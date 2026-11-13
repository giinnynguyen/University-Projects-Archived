using System.Web.Mvc;
using System.Web.Routing;

#nullable disable
namespace HPMusic;

public class RouteConfig
{
  public static void RegisterRoutes(RouteCollection routes)
  {
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
    routes.MapRoute("Default", "{controller}/{action}/{id}", (object) new
    {
      controller = "Home",
      action = "Index",
      id = UrlParameter.Optional
    });
  }
}
