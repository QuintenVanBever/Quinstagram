using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PostApi.Models;
using System;

namespace PostApi.Data
{
    public class PostContext : IdentityDbContext
    {
        public PostContext(DbContextOptions<PostContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Post>();
            builder.Entity<Post>().Property(p => p.Title).IsRequired().HasMaxLength(50);
            builder.Entity<Post>().Property(p => p.Description).HasMaxLength(400);
            builder.Entity<Post>().Property(p => p.ImgUrl).IsRequired();
            builder.Entity<Post>().Property(p => p.Creator);
            builder.Entity<Comment>().Property(c => c.Message).HasMaxLength(1024);

            builder.Entity<Customer>().Property(c => c.FullName).IsRequired().HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Email).IsRequired().HasMaxLength(100);

            builder.Entity<CustomerFavorite>().HasKey(f => new { f.CustomerId, f.PostId });
            builder.Entity<CustomerFavorite>().HasOne(f => f.Customer).WithMany(u => u.Favorites).HasForeignKey(f => f.CustomerId);
            builder.Entity<CustomerFavorite>().HasOne(f => f.Post).WithMany().HasForeignKey(f => f.PostId);

            //Another way to seed the database
            builder.Entity<Post>().HasData(
                new Post
                {
                    Id = 1,
                    Title = "Best day of my life!",
                    Description = "Today I finally got married! And to add onto this, I'm pregnant!",
                    ImgUrl = "marriage.jpg",
                    Creator = "admin@admin.be",
                    Created = DateTime.Now
                },
                new Post
                {
                    Id = 2,
                    Title = "Goodbye my friend",
                    Description = "This is Boris, my cute dog. he went missing 3 weeks ago and was found earlier week, dead. May his soul rest in peace",
                    ImgUrl = "happy-dog.jpg",
                    Creator = "admin@admin.be",
                    Created = DateTime.Now
                },
                new Post
                {
                    Id = 3,
                    Title = "Bring back the sun",
                    Description = "Wish it was July already. #tbt #vacation",
                    ImgUrl = "summertime.jpg",
                    Creator = "admin@admin.be",
                    Created = DateTime.Now
                }
            );

            builder.Entity<Comment>().HasData(
                new { Id = 1, Message = "OH MY GOD! Congratulations!", PostId = 1 },
                new { Id = 2, Message = "So happy for you guys! Wish you the best!", PostId = 1 },
                new { Id = 3, Message = "I'm finally becoming a grandmother! Love xxx", PostId = 1 },

                new { Id = 4, Message = "RIP! he was a such a good boy :(", PostId = 2 },
                new { Id = 5, Message = "Can't believe this is real... I'm sorry", PostId = 2 },
                new { Id = 6, Message = "Oh no! I'm here for you", PostId = 2 },

                new { Id = 7, Message = "Looking good!", PostId = 3 },
                new { Id = 8, Message = "Same! We need to hang out sometime again!", PostId =3 },
                new { Id = 9, Message = "Cool picture! Where was it taken?", PostId = 3 }

                );


        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}