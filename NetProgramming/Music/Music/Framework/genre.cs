using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("genre")]
public class genre
{
  [Key]
  public int genre_id { get; set; }

  [Required]
  [StringLength(10)]
  public string genremap_id { get; set; }

  [Required]
  [StringLength(50)]
  public string song_id { get; set; }

  public virtual genremap genremap { get; set; }

  public virtual song song { get; set; }
}
