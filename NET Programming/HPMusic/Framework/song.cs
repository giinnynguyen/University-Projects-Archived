using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace HPMusic.Framework;

[Table("song")]
public class song
{
  public song()
  {
    this.comments = (ICollection<comment>) new HashSet<comment>();
    this.genres = (ICollection<genre>) new HashSet<genre>();
    this.likes = (ICollection<like>) new HashSet<like>();
  }

  [Key]
  [StringLength(50)]
  public string song_id { get; set; }

  public int user_id { get; set; }

  [Required]
  [StringLength(50)]
  public string song_name { get; set; }

  public byte type { get; set; }

  [Column(TypeName = "ntext")]
  public string description { get; set; }

  public DateTime? uploaded { get; set; }

  [StringLength(5)]
  public string language_id { get; set; }

  [StringLength(50)]
  public string singer { get; set; }

  public int? download { get; set; }

  [Required]
  [StringLength(50)]
  public string linkID { get; set; }

  [Column(TypeName = "ntext")]
  public string lyric { get; set; }

  public virtual ICollection<comment> comments { get; set; }

  public virtual ICollection<genre> genres { get; set; }

  public virtual ICollection<like> likes { get; set; }

  public virtual song song1 { get; set; }

  public virtual song song2 { get; set; }

  public virtual user user { get; set; }
}
