using System.Collections.Generic;

namespace AngularMvcProject.Models
{
    public class WorkingHours
    {
        public string Url { get; set; }

        public List<ReqWorkingHours> ReqWorkingHours { get; set; }
    }
}