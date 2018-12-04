using System.Collections.Generic;

namespace AngularMvcProject.Models
{
    public class BookAppointment
    {
        public int CompanyId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public string CustomerIdsCommaSeperated { get; set; }
        public string StartHour { get; set; }
        public string StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }
        public bool IsAdded { get; set; }
        public string Message { get; set; }
        public string Notes { get; set; }
        public List<int> CustomerIds { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
    }
}