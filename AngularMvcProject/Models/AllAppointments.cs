using System.Collections.Generic;

namespace AngularMvcProject.Models
{
    public class AllAppointments
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public int ServiceId { get; set; }
        public Employees Employee { get; set; }
        public RequestAddService Service { get; set; }
        public List<int> CustomerIds { get; set; }
        public int Status { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string BookingStatusDisplay { get; set; }
    }
}