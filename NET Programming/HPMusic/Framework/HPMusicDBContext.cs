using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;

#nullable disable
namespace HPMusic.Framework;

public class HPMusicDBContext : DbContext
{
  public HPMusicDBContext()
    : base("Data Source =; Initial Catalog = music; Persist Security Info=True;User ID = ; Password=;MultipleActiveResultSets=True")
  {
  }

  public virtual DbSet<album> albums { get; set; }

  public virtual DbSet<comment> comments { get; set; }

  public virtual DbSet<genre> genres { get; set; }

  public virtual DbSet<genremap> genremaps { get; set; }

  public virtual DbSet<language> languages { get; set; }

  public virtual DbSet<like> likes { get; set; }

  public virtual DbSet<profile> profiles { get; set; }

  public virtual DbSet<relationship> relationships { get; set; }

  public virtual DbSet<song> songs { get; set; }

  public virtual DbSet<user> users { get; set; }

  protected override void OnModelCreating(DbModelBuilder modelBuilder)
  {
    modelBuilder.Entity<album>().Property((Expression<Func<album, string>>) (e => e.description)).IsUnicode(new bool?(false));
    modelBuilder.Entity<comment>().Property((Expression<Func<comment, string>>) (e => e.comment1)).IsUnicode(new bool?(false));
    modelBuilder.Entity<comment>().Property((Expression<Func<comment, string>>) (e => e.song_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<genre>().Property((Expression<Func<genre, string>>) (e => e.genremap_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<genre>().Property((Expression<Func<genre, string>>) (e => e.song_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<genremap>().Property((Expression<Func<genremap, string>>) (e => e.genremap_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<genremap>().HasMany<genre>((Expression<Func<genremap, ICollection<genre>>>) (e => e.genres)).WithRequired((Expression<Func<genre, genremap>>) (e => e.genremap)).WillCascadeOnDelete(false);
    modelBuilder.Entity<language>().Property((Expression<Func<language, string>>) (e => e.language_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<language>().Property((Expression<Func<language, string>>) (e => e.language_name)).IsFixedLength();
    modelBuilder.Entity<like>().Property((Expression<Func<like, string>>) (e => e.song_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<profile>().Property((Expression<Func<profile, string>>) (e => e.avatar)).IsUnicode(new bool?(false));
    modelBuilder.Entity<profile>().HasMany<user>((Expression<Func<profile, ICollection<user>>>) (e => e.users)).WithRequired((Expression<Func<user, profile>>) (e => e.profile)).WillCascadeOnDelete(false);
    modelBuilder.Entity<song>().Property((Expression<Func<song, string>>) (e => e.song_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<song>().Property((Expression<Func<song, string>>) (e => e.language_id)).IsUnicode(new bool?(false));
    modelBuilder.Entity<song>().Property((Expression<Func<song, string>>) (e => e.linkID)).IsUnicode(new bool?(false));
    modelBuilder.Entity<song>().HasMany<genre>((Expression<Func<song, ICollection<genre>>>) (e => e.genres)).WithRequired((Expression<Func<genre, song>>) (e => e.song)).WillCascadeOnDelete(false);
    modelBuilder.Entity<song>().HasOptional<song>((Expression<Func<song, song>>) (e => e.song1)).WithRequired((Expression<Func<song, song>>) (e => e.song2));
    modelBuilder.Entity<user>().Property((Expression<Func<user, string>>) (e => e.username)).IsUnicode(new bool?(false));
    modelBuilder.Entity<user>().Property((Expression<Func<user, string>>) (e => e.email)).IsUnicode(new bool?(false));
    modelBuilder.Entity<user>().Property((Expression<Func<user, string>>) (e => e.pass)).IsUnicode(new bool?(false));
    modelBuilder.Entity<user>().HasMany<relationship>((Expression<Func<user, ICollection<relationship>>>) (e => e.relationships)).WithRequired((Expression<Func<relationship, user>>) (e => e.user)).HasForeignKey<int>((Expression<Func<relationship, int>>) (e => e.user_id)).WillCascadeOnDelete(false);
    modelBuilder.Entity<user>().HasMany<relationship>((Expression<Func<user, ICollection<relationship>>>) (e => e.relationships1)).WithRequired((Expression<Func<relationship, user>>) (e => e.user1)).HasForeignKey<int>((Expression<Func<relationship, int>>) (e => e.follower_id)).WillCascadeOnDelete(false);
    modelBuilder.Entity<user>().HasMany<song>((Expression<Func<user, ICollection<song>>>) (e => e.songs)).WithRequired((Expression<Func<song, user>>) (e => e.user)).WillCascadeOnDelete(false);
  }
}
