using HPMusic.Models;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Controllers;

public class HomeController : Controller
{
  [HttpGet]
  public ActionResult Index()
  {
    HomeModel homeModel = new HomeModel();
    return (ActionResult) this.View();
  }

  [HttpGet]
  public ActionResult Cover() => (ActionResult) this.View();

  [HttpGet]
  public ActionResult Origin() => (ActionResult) this.View();

  [HttpGet]
  public ActionResult Instrutment() => (ActionResult) this.View();

  [HttpGet]
  public ActionResult Test() => (ActionResult) this.View();
}
