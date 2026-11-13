using HPMusic.Framework;
using System.Collections.Generic;

#nullable disable
namespace HPMusic.Models;

public class PlayModel
{
  public song SongFromID { get; set; }

  public List<string> GenreOfSong { get; set; }

  public List<song> SongOfUser { get; set; }

  public static string next(string songID, int user_id)
  {
    List<song> songList = SongDAO.SongOfUser(user_id);
    for (int index1 = 0; index1 < songList.Count; ++index1)
    {
      if (songList[index1].song_id.Equals(songID))
      {
        if (index1 == songList.Count - 1)
          return songList[0].song_id;
        int num;
        int index2 = num = index1 + 1;
        return songList[index2].song_id;
      }
    }
    return (string) null;
  }
}
