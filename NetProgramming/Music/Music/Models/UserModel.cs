using HPMusic.Framework;
using System.Collections.Generic;

#nullable disable
namespace HPMusic.Models;

public class UserModel
{
  public user User { get; set; }

  public profile Profile { get; set; }

  public List<song> SongUserPopular { get; set; }

  public List<song> SongUser { get; set; }
}
