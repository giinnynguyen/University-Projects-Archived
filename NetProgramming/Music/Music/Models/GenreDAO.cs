using HPMusic.Framework;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

#nullable disable
namespace HPMusic.Models;

public class GenreDAO
{
  public static IList<genremap> listGenreMap()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return (IList<genremap>) hpMusicDbContext.genremaps.SqlQuery("ListGenre").ToList<genremap>();
  }

  public static List<string> GenreFromSongID(string ID)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@SongID", (object) ID)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<string>("GenreFromSongID @SongID", objArray).ToList<string>();
  }

  public static string DisplayGenreName(string genremapid)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@GenreMapID", (object) genremapid)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<string>("DisplayGenre @GenreMapID", objArray).FirstOrDefault<string>();
  }
}
