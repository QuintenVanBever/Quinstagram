using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PostApi.Models
{
    public class Comment
    {
        #region Properties
        public int Id { get; set; }

        [Required]
        public string Message { get; set; }


        #endregion

        #region Constructors
        public Comment(string message)
        {
            Message = message;
        }
        #endregion
    }
}
