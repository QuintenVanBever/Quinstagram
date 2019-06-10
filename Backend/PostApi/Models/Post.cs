using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace PostApi.Models
{
    public class Post
    {
        #region Properties
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string ImgUrl { get; set; }

        public string Creator { get; set; }

        public DateTime Created { get; set; }

        public ICollection<Comment> Comments { get; private set; }

        #endregion

        #region Constructors
        public Post()
        {
            Comments = new Collection<Comment>();

        }


        public Post(string title, string description, string imgUrl, string creator)
        {
            Title = title;
            Description = description;
            ImgUrl = imgUrl;
            Creator = creator;
        }

        public Post(int id, string title, string description, string imgUrl, string creator, DateTime created)
        {
            Id = id;
            Title = title;
            Description = description;
            ImgUrl = imgUrl;
            Created = created;
            Creator = creator;
            Comments = new Collection<Comment>();
        }
        #endregion

        #region Methods
        public void AddComment(Comment comment) => Comments.Add(comment);

        public Comment GetComment(int id) => Comments.SingleOrDefault(c => c.Id == id);
        #endregion

    }
}