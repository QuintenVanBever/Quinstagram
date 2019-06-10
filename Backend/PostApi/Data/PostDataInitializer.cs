using Microsoft.AspNetCore.Identity;
using PostApi.Models;
using System;
using System.Threading.Tasks;

namespace PostApi.Data
{
    public class PostDataInitializer
    {
        private readonly PostContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public PostDataInitializer(PostContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task InitializeData()
        {

            // Drop data in database (only use when you want to clear DB)
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                //seeding the database with recipes, see DBContext  


                Customer web4 = new Customer { Email = "web4@admin.be", FullName = "web4" };
                _dbContext.Customers.Add(web4);
                await CreateUser(web4.Email, "gelukkiggeennetbeans");

                Customer admin = new Customer { Email = "admin@admin.be", FullName = "Quinstagram" };
                _dbContext.Customers.Add(admin);
                await CreateUser(admin.Email, "admin");

                Customer user = new Customer { Email = "user@quinten.be", FullName = "user" };
                _dbContext.Customers.Add(user);
                await CreateUser(user.Email, "P@ssword1111");

                _dbContext.SaveChanges();
                
            }
        }

        private async Task CreateUser(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };
            await _userManager.CreateAsync(user, password);
        }
    }
}

