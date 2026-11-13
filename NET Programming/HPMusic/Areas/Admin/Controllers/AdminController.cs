using Google.Apis.Drive.v2;
using HPMusic.Areas.Admin.Models;
using HPMusic.Models;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Areas.Admin.Controllers;

public class AdminController : Controller
{
  private DriveService service = ServiceApi.GetService();

  [HttpGet]
  public ActionResult Index() => (ActionResult) this.View();

  [HttpPost]
  public ActionResult Index(AdminLoginModel model)
  {
    // mock data
    if (!(model.Username == "admin") || !(model.Password == "1234"))
      return (ActionResult) this.RedirectToAction(nameof (Index));
    this.Session["Admin"] = (object) model;
    return (ActionResult) this.RedirectToAction("GetAllFile");
  }

  public ActionResult GetAllFile()
  {
    return (ActionResult) this.View((object) new ManageSongModel()
    {
      Song = SongDAO.listAllSong()
    });
  }

  public ActionResult ListSong(
    string sortOrder,
    string currentFilter,
    string searchString,
    int? page)
  {
    return (ActionResult) this.View((object) new ManageSongModel()
    {
      Song = SongDAO.listAllSong()
    });
  }

  public ActionResult Delete(string id)
  {
    GoogleDriveApi.DeleteFile(this.service, id);
    SongDAO.deleteSong(id);
    return (ActionResult) this.RedirectToAction("GetAllFile");
  }

  public ActionResult Update() => (ActionResult) this.View();
}
