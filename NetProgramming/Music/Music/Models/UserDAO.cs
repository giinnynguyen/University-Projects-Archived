using HPMusic.Framework;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

#nullable disable
namespace HPMusic.Models;

public class UserDAO
{
  public static bool checkLogin(string username, string password)
  {
    object[] objArray = new object[2]
    {
      (object) new SqlParameter("@username", (object) username),
      (object) new SqlParameter("@password", (object) password)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<bool>("Sp_Login @username,@password", objArray).SingleOrDefault<bool>();
  }

  public static user UserFromID(int user_id)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<user>("SELECT *  FROM [user] where [user].user_id = @user_id", (object) new SqlParameter("@user_id", (object) user_id)).FirstOrDefault<user>();
  }

  public static user UserFromUsername(string username)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<user>("SELECT *  FROM [user] where [user].username = @user_name", (object) new SqlParameter("@user_name", (object) username)).FirstOrDefault<user>();
  }

  public static profile UserProfile(int profile_id)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<profile>("SELECT *  FROM [profile] where [profile].profile_id = @profile_id", (object) new SqlParameter("@profile_id", (object) profile_id)).FirstOrDefault<profile>();
  }

  public static int topUser()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<int>("select top 1 user_id from song order by download").FirstOrDefault<int>();
  }

  public static List<int> top10User()
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<int>("select top 10 user_id from song order by download desc").ToList<int>();
  }

  public static bool CheckFollow(int userfollow, int follower)
  {
    int num = 0;
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      num = hpMusicDbContext.Database.SqlQuery<int>("select [relationship].user_id from [relationship] where [relationship].follower_id = @follower_id", (object) new SqlParameter("@follower_id", (object) follower)).FirstOrDefault<int>();
    return num == userfollow;
  }

  public static void follow(int userFollow, int follower)
  {
    object[] objArray = new object[2]
    {
      (object) new SqlParameter("@user_id", (object) userFollow),
      (object) new SqlParameter("@follower", (object) follower)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      hpMusicDbContext.Database.ExecuteSqlCommand("insert into [relationship] values(@user_id,@follower)", objArray);
  }

  public static void unfollow(int userFollow, int follower)
  {
    object[] objArray = new object[2]
    {
      (object) new SqlParameter("@user_id", (object) userFollow),
      (object) new SqlParameter("@follower", (object) follower)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      hpMusicDbContext.Database.ExecuteSqlCommand("delete from [relationship] where [relationship].follower_id = @follower and [relationship].user_id = @user_id", objArray);
  }

  public static List<int> numFollower(int user_id)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<int>("select follower_id from [relationship] where user_id = @user_id", (object) new SqlParameter("@user_id", (object) user_id)).ToList<int>();
  }

  public static List<int> numFollow(int user_id)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<int>("select user_id from [relationship] where follower_id = @follower_id", (object) new SqlParameter("@follower_id", (object) user_id)).ToList<int>();
  }

  public static bool CheckFriend(int idFriend, int idAdd)
  {
    object[] objArray = new object[2]
    {
      (object) new SqlParameter("@idAdd", (object) idAdd),
      (object) new SqlParameter("@idFriend", (object) idFriend)
    };
    List<int> intList = (List<int>) null;
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      intList = hpMusicDbContext.Database.SqlQuery<int>("select [friend].id_add from [dbo].[friend] where id_add = @idAdd and id_friend = @idFriend and waiting = 0", objArray).ToList<int>();
    return intList.Count > 0;
  }

  public static bool checkEmailExist(string email)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<bool>("CheckEmailExist @email", (object) new SqlParameter("@email", (object) email)).SingleOrDefault<bool>();
  }

  public static bool checkUsernameExist(string username)
  {
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.SqlQuery<bool>("CheckUsername @username", (object) new SqlParameter("@username", (object) username)).SingleOrDefault<bool>();
  }

  public static int Register(string email, string username, string pass)
  {
    object[] objArray = new object[3]
    {
      (object) new SqlParameter("@Email", (object) email),
      (object) new SqlParameter("@Username", (object) username),
      (object) new SqlParameter("@Pass", (object) pass)
    };
    using (HPMusicDBContext hpMusicDbContext = new HPMusicDBContext())
      return hpMusicDbContext.Database.ExecuteSqlCommand("Register @Email,@Pass,@Username", objArray);
  }
}
