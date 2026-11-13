using HPMusic.Framework;
using System.Collections.Generic;

#nullable disable
namespace HPMusic.Models;

public class HomeModel
{
  public List<song> PopularSong { get; set; }

  public List<song> NewSongs { get; set; }
}
