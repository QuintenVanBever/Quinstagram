using System.Collections.Generic;

namespace PostApi.Models
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetAll();
        Customer GetBy(string email);
        void Add(Customer customer);
        void SaveChanges();
    }
}
