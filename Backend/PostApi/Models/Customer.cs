using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostApi.Models
{
    public class Customer
    {
        #region Properties
        public int CustomerId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public ICollection<CustomerFavorite> Favorites { get; private set; }

        public IEnumerable<Post> FavoritePosts => Favorites.Select(f => f.Post);
        #endregion

        #region Constructors
        public Customer()
        {
            Favorites = new List<CustomerFavorite>();
        }
        #endregion

        #region Methods
        public void addFavoritePost(Post post)
        {
            Favorites.Add(new CustomerFavorite() { PostId = post.Id, CustomerId = CustomerId, Post = post, Customer = this });
        }
        #endregion

    }
}
