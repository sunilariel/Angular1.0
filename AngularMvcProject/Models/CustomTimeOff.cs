namespace AngularMvcProject.Models
{
    public class CustomTimeOff
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string CreationDate { get; set; }
        public bool IsOffAllDay { get; set; }
    }
}