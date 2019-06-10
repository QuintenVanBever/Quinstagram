using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostApi.Models
{
    public class CustomerFavorite
    {
        #region Properties
        public int CustomerId { get; set; }

        public int PostId { get; set; }

        public Customer Customer { get; set; }

        public Post Post { get; set; }
        #endregion
    }
}
