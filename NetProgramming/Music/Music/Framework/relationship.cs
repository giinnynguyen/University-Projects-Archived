using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("relationship")]
public class relationship
{
  public int id { get; set; }

  public int user_id { get; set; }

  public int follower_id { get; set; }

  public virtual user user { get; set; }

  public virtual user user1 { get; set; }
}
