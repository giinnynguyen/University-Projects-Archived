using HPMusic.Framework;
using System.Data.Entity.Migrations;

#nullable disable
namespace HPMusic.Migrations;

internal sealed class Configuration : DbMigrationsConfiguration<HPMusicDBContext>
{
  public Configuration() => this.AutomaticMigrationsEnabled = true;

  protected override void Seed(HPMusicDBContext context)
  {
  }
}
