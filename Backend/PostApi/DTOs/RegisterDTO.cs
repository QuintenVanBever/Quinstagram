using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PostApi.DTOs
{
    public class RegisterDTO : LoginDTO
    {
        [Required]
        [StringLength(50)]
        public String FullName { get; set; }

        [Required]
        [Compare("Password")]
        public String PasswordConfirmation { get; set; } 
    }
}
