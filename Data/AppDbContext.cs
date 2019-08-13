using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NG_Core_Auth.Models;

namespace NG_Core_Auth.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        //Creating Roles for or app

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new {Id = "1", Name = "Admin", NormalizedName = "ADMIN"},
                new {Id = "2", Name = "Customer", NormalizedName = "CUSTOMER"},
                new {Id = "3", Name = "Moderator", NormalizedName = "MODERATOR"}
            );
        }
        
        public DbSet<ProductModel> Products { get; set; }
    }
}