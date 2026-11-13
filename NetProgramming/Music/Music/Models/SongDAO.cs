using HPMusic.Framework;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

#nullable disable
namespace HPMusic.Models;

public class SongDAO
{
  public static int InsertSong(
    string songID,
    int userID,
    string songName,
    int type,
    string description,
    string languageID,
    string singer,
    string linkID,
    string lyric)
  {
    object[] objArray = new object[9]
    {
      (object) new SqlParameter("@SongID", (object) songID),
      (object) new SqlParameter("@UserID", (object) userID),
      (object) new SqlParameter("@SongName", (object) songName),
      (object) new SqlParameter("@Type", (object) type),
      (object) new SqlParameter("@Description", (object) description),
      (object) new SqlParameter("@LanguageID", (object) languageID),
      (object) new SqlParameter("@Singer", (object) singer),
      (object) new SqlParameter("@LinkID", (object) linkID),
      (object) new SqlParameter("@Lyric", (object) lyric)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.ExecuteSqlCommand("InsertSong @SongID,@UserID,@SongName,@Type,@Description,@LanguageID,@Singer,@LinkID,@Lyric", objArray);
  }

  public static int InsertGenre(string genre, string songID)
  {
    object[] objArray = new object[2]
    {
      (object) new SqlParameter("@Genre", (object) genre),
      (object) new SqlParameter("@SongID", (object) songID)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.ExecuteSqlCommand("InsertGenre @Genre,@SongID", objArray);
  }

  public static List<song> listAllSong()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.songs.SqlQuery("ListSong").ToList<song>();
  }

  public static void deleteSong(string songID)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
    {
      object[] objArray = new object[1]
      {
        (object) new SqlParameter("@SongID", (object) songID)
      };
      hpMusicDbContext.Database.ExecuteSqlCommand("DeleteSong @SongID", objArray);
    }
  }

  public static string DisplayUsernameFromUserID(int userid)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@UserID", (object) userid)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<string>("DisplayUsername @UserID", objArray).FirstOrDefault<string>();
  }

  public static string DisplayLanguageName(string languageid)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@LanguageID", (object) languageid)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<string>("DisplayLanguage @LanguageID", objArray).FirstOrDefault<string>();
  }

  public static List<song> popularSong()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.songs.SqlQuery("SELECT TOP 20 * FROM [music].[dbo].[song] order by download desc").ToList<song>();
  }

  public static List<song> newSongs()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.songs.SqlQuery("SELECT TOP 20 * FROM [music].[dbo].[song] order by uploaded desc").ToList<song>();
  }

  public static song SongFromID(string songID)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@SongID", (object) songID)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<song>("GetSongFromID @SongID", objArray).FirstOrDefault<song>();
  }

  public static List<song> SongOfUser(int UserID)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@UserID", (object) UserID)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<song>("SongOfUser @UserID", objArray).ToList<song>();
  }

  public static List<song> SongOfUserPopular(int UserID)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@UserID", (object) UserID)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<song>("SongOfUserPopular @UserID", objArray).ToList<song>();
  }

  public static int GetUserIDFromSong(string songID)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@SongID", (object) songID)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<int>("GetUserIDFromSongID @SongID", objArray).FirstOrDefault<int>();
  }

  public static void updateDownload(string songID)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      hpMusicDbContext.Database.ExecuteSqlCommand("UPDATE song SET download = download+1 WHERE song_id=@id", (object) new SqlParameter("@id", (object) songID));
  }

  public static string avatar(int user_id)
  {
    object[] objArray = new object[1]
    {
      (object) new SqlParameter("@UserID", (object) user_id)
    };
    string str = (string) null;
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      str = hpMusicDbContext.Database.SqlQuery<string>("Avatar @UserID", objArray).FirstOrDefault<string>();
    return "\\Assets\\client\\img\\user\\" + str;
  }

  public static List<song> SongCover()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<song>("SELECT * FROM [music].[dbo].[song] s where s.type =1").ToList<song>();
  }

  public static List<song> SongOrigin()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<song>("SELECT * FROM [music].[dbo].[song] s where s.type =0").ToList<song>();
  }

  public static List<song> SongInstrutment()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<song>("SELECT * FROM [music].[dbo].[song] s where s.type =2").ToList<song>();
  }
}
