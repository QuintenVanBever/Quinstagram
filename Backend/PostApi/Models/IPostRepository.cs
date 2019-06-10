using System.Collections.Generic;

namespace PostApi.Models
{
    public interface IPostRepository
    {
            Post GetBy(int id);
            bool TryGetPost(int id, out Post post);
            IEnumerable<Post> GetAll();
            void Add(Post post);
            void Delete(Post post);
            void Update(Post post);
            void SaveChanges();
        }
    }

