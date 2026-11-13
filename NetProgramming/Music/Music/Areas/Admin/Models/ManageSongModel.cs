using HPMusic.Framework;
using System.Collections.Generic;

#nullable disable
namespace HPMusic.Areas.Admin.Models;

public class ManageSongModel
{
  public List<song> Song { get; set; }

  public IEnumerable<language> Language { get; set; }
}
