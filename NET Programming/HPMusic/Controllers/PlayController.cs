using Google.Apis.Drive.v2;
using HPMusic.Models;
using System;
using System.IO;
using System.Web.Mvc;

#nullable disable
namespace HPMusic.Controllers;

public class PlayController : Controller
{
  public ActionResult Play(string id)
  {
    PlayModel model = new PlayModel();
    model.SongFromID = SongDAO.SongFromID(id);
    model.GenreOfSong = GenreDAO.GenreFromSongID(id);
    int userIdFromSong = SongDAO.GetUserIDFromSong(id);
    model.SongOfUser = SongDAO.SongOfUser(userIdFromSong);
    return (ActionResult) this.View((object) model);
  }

  [HttpGet]
  public FileContentResult Download(string id)
  {
    string str = AppDomain.CurrentDomain.BaseDirectory + "Assets\\data\\file.mp3";
    DriveService service = ServiceApi.GetService();
    if (!GoogleDriveApi.downloadFile(service, GoogleDriveApi.printFile(service, id), str))
      return (FileContentResult) null;
    SongDAO.updateDownload(id);
    string fileDownloadName = SongDAO.SongFromID(id).song_name + ".mp3";
    return this.File(PlayController.FileToByteArray(str), "audio/mpeg", fileDownloadName);
  }

  public static byte[] FileToByteArray(string fileName)
  {
    return new BinaryReader((Stream) new FileStream(fileName, FileMode.Open, FileAccess.Read)).ReadBytes((int) new FileInfo(fileName).Length);
  }
}
