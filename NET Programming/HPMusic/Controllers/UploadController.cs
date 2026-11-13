using Google.Apis.Drive.v2;
using HPMusic.Framework;
using HPMusic.Models;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Controllers;

public class UploadController : Controller
{
  private DriveService service = ServiceApi.GetService();

  [HttpGet]
  public ActionResult Upload()
  {
    if (this.Session["UserLogin"] == null)
      return (ActionResult) this.RedirectToAction("Login", "Login");
    IList<genremap> genremapList = GenreDAO.listGenreMap();
    UploadModel model = new UploadModel();
    model.Checkbox = new List<CheckBoxModel>();
    for (int index = 0; index < genremapList.Count; ++index)
    {
      model.Checkbox.Add(new CheckBoxModel());
      model.Checkbox[index].Name = genremapList[index].genreName;
      model.Checkbox[index].GenreID = genremapList[index].genremap_id;
    }
    return (ActionResult) this.View((object) model);
  }

  [HttpPost]
  [ValidateInput(false)]
  public ActionResult Upload(HttpPostedFileBase file, UploadModel model)
  {
    if (model.Song.singer == null)
      model.Song.singer = "default";
    if (model.Song.description == null)
      model.Song.description = "Chưa có mô tả nào cho bài hát này";
    if (model.Song.lyric == null)
      model.Song.lyric = "Bài hát này chưa có lời";
    Google.Apis.Drive.v2.Data.File file1 = (Google.Apis.Drive.v2.Data.File) null;
    if (this.Request.Files.Count > 0 && file != null && file.ContentLength > 0 && file.ContentLength > 0)
    {
      string fileName = Path.GetFileName(file.FileName);
      string str = Path.Combine(this.Server.MapPath("~/App_Data/"), fileName);
      file.SaveAs(str);
      file1 = GoogleDriveApi.uploadFile(this.service, str, "0B30Wl0EkX-0CeDNaWXpvZUlDcmc", model.Song.song_name);
      GoogleDriveApi.InsertPermission(this.service, file1.Id);
      System.IO.File.Delete(str);
    }
    string id = file1.Id;
    string webContentLink = file1.WebContentLink;
    user user = this.Session["UserLogin"] as user;
    SongDAO.InsertSong(id, user.user_id, model.Song.song_name, (int) model.Song.type, model.Song.description, model.Song.language_id, model.Song.singer, webContentLink, model.Song.lyric);
    for (int index = 0; index < model.Checkbox.Count; ++index)
    {
      if (model.Checkbox[index].Check)
        SongDAO.InsertGenre(model.Checkbox[index].GenreID, id);
    }
    return (ActionResult) this.RedirectToAction("Index", "Home");
  }
}
