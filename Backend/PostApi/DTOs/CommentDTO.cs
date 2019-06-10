using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PostApi.DTOs
{
    public class CommentDTO
    {
        [Required]
        public string Message { get; set; }
    }
}
