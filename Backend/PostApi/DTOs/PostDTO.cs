using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PostApi.DTOs
{
    public class PostDTO
    {

        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string ImgUrl { get; set; }

        public int CreatorID { get; set; }

        public DateTime Created { get; set; }

        public ICollection<CommentDTO> Comments { get; set; }
    }
}
