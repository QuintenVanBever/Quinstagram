using Microsoft.EntityFrameworkCore;
using PostApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace PostApi.Data.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly PostContext _context;
        private readonly DbSet<Customer> _customers;

        public CustomerRepository(PostContext dbContext)
        {
            _context = dbContext;
            _customers = dbContext.Customers;
        }

        public IEnumerable<Customer> GetAll()
        {
            return _customers.Include(p => p.Favorites);
        }


        public Customer GetBy(string email)
        {
            return _customers.Include(c => c.Favorites).ThenInclude(f => f.Post).SingleOrDefault(c => c.Email == email);
        }

        public void Add(Customer customer)
        {
            _customers.Add(customer);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
