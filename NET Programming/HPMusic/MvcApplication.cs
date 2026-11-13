using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

#nullable disable
namespace HPMusic;

public class MvcApplication : HttpApplication
{
  protected void Application_Start()
  {
    AreaRegistration.RegisterAllAreas();
    RouteConfig.RegisterRoutes(RouteTable.Routes);
  }
}
