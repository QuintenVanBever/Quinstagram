using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PostApi.DTOs;
using PostApi.Models;

namespace PostApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly ICustomerRepository _customerRepository;

        public PostsController(IPostRepository context, ICustomerRepository customerRepository)
        {
            _postRepository = context;
            _customerRepository = customerRepository;

        }
        
        //GET: api/Posts -> get all posts
        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<Post> GetPosts()
        {
            return _postRepository.GetAll().OrderBy(r => r.Id);
        }


        //Favorite Posts
        [HttpGet("Favorites")]
        public IEnumerable<Post> GetFavorites()
        {
            Customer customer = _customerRepository.GetBy(User.Identity.Name);
            return customer.FavoritePosts;
        }

        //GET: api/Posts/id -> get posts by Id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<Post> GetPost(int id)
        {
            Post post = _postRepository.GetBy(id);
            return post;
        }

        //POST: api/Posts -> Add post
        [HttpPost]
        public ActionResult<Post> PostPost(Post post)
        {
            _postRepository.Add(post);
            _postRepository.SaveChanges();

            return CreatedAtAction(nameof(GetPost),
               new { id = post.Id }, post);
        }

        //PUT: api/Posts/id -> update a post by given Id
        [HttpPut("{id}")]
        public IActionResult PutPost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            _postRepository.Update(post);
            _postRepository.SaveChanges();
            return NoContent();
        }

        //DELETE: api/Posts/id -> delete a post by Id
        [HttpDelete("{id}")]
        public ActionResult<Post> DeletePost(int id)
        {
            Post post = _postRepository.GetBy(id);
            if (post == null)
            {
                return NotFound();
            }
            _postRepository.Delete(post);
            _postRepository.SaveChanges();
            return post;
        }

        //add Comment
        [HttpPost("{id}/comments")]
        public ActionResult<Comment> PostComment(int id, CommentDTO comment)
        {
            if(!_postRepository.TryGetPost(id, out var post))
            {
                return NotFound();
            }
            var commentToCreate = new Comment(comment.Message);
            post.AddComment(commentToCreate);
            _postRepository.SaveChanges();
            return CreatedAtAction("GetComment", new { id = post.Id, commentId = commentToCreate.Id }, commentToCreate);
        }

        //get Comment
        [HttpGet("{id}/comments/{commentId}")]
        public ActionResult<Comment> GetComment(int id, int commentId)
        {
            if (!_postRepository.TryGetPost(id, out var post))
            {
                return NotFound();
            }
            Comment comment = post.GetComment(commentId);
            if (comment == null) return NotFound();
            return comment;
        }


        //GET: comments from 1 post
        [HttpGet("{id}/comments")]
        [AllowAnonymous]
        public ICollection<Comment> GetComments(int id)
        {
            Post post = _postRepository.GetBy(id);
            return post.Comments;
        }

    }   
}