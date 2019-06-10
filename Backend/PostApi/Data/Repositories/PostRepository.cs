using Microsoft.EntityFrameworkCore;
using PostApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace PostApi.Data.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly PostContext _context;
        private readonly DbSet<Post> _posts;

        public PostRepository(PostContext dbContext)
        {
            _context = dbContext;
            _posts = dbContext.Posts;
        }

        public IEnumerable<Post> GetAll()
        {
            return _posts.Include(p => p.Comments);
        }

        public Post GetBy(int id)
        {
            return _posts.Include(p => p.Comments).SingleOrDefault(r => r.Id == id);
        }

        public bool TryGetPost(int id, out Post post)
        {
            post = _context.Posts.FirstOrDefault(t => t.Id == id);
            return post != null;
        }

        public void Add(Post post)
        {
            _posts.Add(post);
        }

        public void Update(Post post)
        {
            _context.Update(post);
        }

        public void Delete(Post post)
        {
            _posts.Remove(post);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
